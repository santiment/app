/* eslint-env jest */
import { ApolloClient } from 'apollo-client'
import { mockSingleLink } from '@apollo/react-testing'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ActionsObservable } from 'redux-observable'
import configureStore from 'redux-mock-store'
import {
  connectedWordsEpic,
  connectedWordsOptimizationEpic
} from './connectedWordsEpic'
import {
  TRENDS_HYPED_FETCH_SUCCESS,
  TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS,
  TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
} from '../../components/Trends/actions'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../queries/InsightsGQL'

const mockStore = configureStore([])

const createClient = link => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false
    })
  })
}

const insightFields = {
  readyState: '',
  title: '',
  createdAt: '',
  publishedAt: '',
  updatedAt: '',
  votedAt: '',
  votes: {
    totalVotes: ''
  },
  user: {
    username: '',
    id: ''
  },
  __typename: 'Post'
}

const mockedData = {
  allAssets: [
    { ticker: 'BTC', slug: 'bitcoin', name: 'Bitcoin' },
    { ticker: 'ETH', slug: 'ethereum', name: 'Ethereum' },
    { ticker: 'DOGE', slug: 'doge', name: 'Doge coin' }
  ],
  trends: {
    synonyms: {
      items: [
        {
          datetime: '',
          topWords: [
            { word: 'btc' },
            { word: 'eth' },
            { word: 'bitcoin' },
            { word: 'ethereum' },
            { word: 'weird' },
            { word: 'not-a-trend' }
          ]
        }
      ]
    },
    hard: {
      items: [
        {
          datetime: '',
          topWords: [
            { word: 'btc' },
            { word: 'ethereum' },
            { word: 'bch' },
            { word: 'doge' }
          ]
        }
      ]
    }
  },

  insights: {
    allInsightsByTag: [
      {
        ...insightFields,
        title: 'BTC + DOGE',
        id: 0,
        tags: [{ name: 'BTC' }, { name: 'DOGE' }]
      },
      {
        ...insightFields,
        title: 'ETH',
        id: 1,
        tags: [{ name: 'ETH' }]
      },
      {
        ...insightFields,
        title: 'DOGE',
        id: 2,
        tags: [{ name: 'DOGE' }]
      },
      {
        ...insightFields,
        title: 'BCH + DOGE + ETH',
        id: 3,
        tags: [{ name: 'BCH' }, { name: 'DOGE' }, { name: 'ETH' }]
      }
    ]
  }
}

const allMockedInsights = mockedData.insights.allInsightsByTag.slice()

const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

const oneDayTimestamp = 1000 * 60 * 60 * 24

const getMockedQueries = () => {
  return [0, 1, 2].map(i => ({
    request: {
      query: ALL_INSIGHTS_BY_TAG_QUERY,
      variables: {
        tag: getInsightTrendTagByDate(
          new Date(Date.now() - oneDayTimestamp * i)
        )
      }
    },
    result: { data: i === 0 ? mockedData.insights : { allInsightsByTag: [] } }
  }))
}

const link = mockSingleLink(
  ...getMockedQueries(),
  ...getMockedQueries(),
  ...getMockedQueries()
)

describe('Connect Trending Words', () => {
  beforeEach(async () => {
    const actionOptimization$ = ActionsObservable.of({
      type: TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS,
      payload: {
        allAssets: mockedData.allAssets
      }
    })
    const epic = connectedWordsOptimizationEpic(actionOptimization$)
    const promise = epic.toArray().toPromise()
    await promise
  })

  it('should connect synonyms', async () => {
    const client = await createClient(link)

    const action$ = ActionsObservable.from([
      {
        type: TRENDS_HYPED_FETCH_SUCCESS,
        payload: mockedData.trends.synonyms
      },
      {
        type: TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
      }
    ])
    const epic$ = connectedWordsEpic(action$, mockStore({}), { client })
    const promise = epic$.toPromise()
    const result = await promise

    expect(result.payload.connectedTrends).toEqual({
      BITCOIN: ['BTC'],
      BTC: ['BITCOIN'],
      ETH: ['ETHEREUM'],
      ETHEREUM: ['ETH']
    })
  })

  it('should connect trends', async () => {
    const client = await createClient(link)

    const action$ = ActionsObservable.from([
      {
        type: TRENDS_HYPED_FETCH_SUCCESS,
        payload: mockedData.trends.hard
      },
      {
        type: TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
      }
    ])
    const epic$ = connectedWordsEpic(action$, mockStore({}), { client })
    const promise = epic$.toPromise()
    const result = await promise

    expect(result.payload.connectedTrends).toEqual({
      BCH: ['DOGE', 'ETHEREUM'],
      BTC: ['DOGE'],
      DOGE: ['BCH', 'ETHEREUM', 'BTC'],
      ETHEREUM: ['BCH', 'DOGE']
    })
  })

  it('should connect insights', async () => {
    const client = await createClient(link)

    const action$ = ActionsObservable.from([
      {
        type: TRENDS_HYPED_FETCH_SUCCESS,
        payload: mockedData.trends.hard
      },
      {
        type: TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
      }
    ])
    const epic$ = connectedWordsEpic(action$, mockStore({}), { client })
    const promise = epic$.toPromise()
    const {
      payload: { TrendToInsights }
    } = await promise

    const mockedInsights = allMockedInsights.map(
      ({ tags, ...insight }) => insight
    )
    Object.keys(TrendToInsights).forEach(key => {
      TrendToInsights[key].sort(({ id: a }, { id: b }) => a - b)
    })
    expect(TrendToInsights).toEqual({
      BCH: [mockedInsights[3]],
      BTC: [mockedInsights[0]],
      DOGE: [mockedInsights[0], mockedInsights[2], mockedInsights[3]],
      ETHEREUM: [mockedInsights[1], mockedInsights[3]],
      ETH: [mockedInsights[1], mockedInsights[3]]
    })
  })
})

/* eslint-env jest */
import { ApolloClient } from 'apollo-client'
import { mockSingleLink } from '@apollo/react-testing'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ActionsObservable } from 'redux-observable'
import configureStore from 'redux-mock-store'
import fetchTimeseriesEpic from './epics'
import { getMetricQUERY } from './timeseries'
import { GET_METRIC } from './queries/get_metric.js'
import * as actions from './actions'
const mockStore = configureStore([])

const createClient = link => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false
    })
  })
}

const mockedData = {
  getMetric: {
    timeseriesData: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => ({
      price_usd: Math.round(100),
      datetime: '2018-12-01T13:37:02.07080' + index
    }))
  }
}

const mockedDevActivity = {
  devActivity: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => ({
    activity: Math.round(100),
    datetime: '2018-12-01T13:37:02.07080' + index
  }))
}

const link = mockSingleLink(
  {
    request: {
      query: GET_METRIC('price_usd'),
      variables: {
        metric: 'price_usd',
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10'
      }
    },
    result: { data: mockedData }
  },
  {
    request: {
      query: GET_METRIC('price_usd'),
      variables: {
        metric: 'price_usd',
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10'
      }
    },
    result: { data: mockedData }
  },
  {
    request: {
      query: getMetricQUERY('devActivity'),
      metric: 'devActivity',
      variables: {
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10',
        transform: 'movingAverage',
        movingAverageIntervalBase: 7
      }
    },
    result: { data: mockedDevActivity }
  },
  {
    request: {
      query: GET_METRIC('price_usd'),
      variables: {
        metric: 'price_usd',
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10'
      }
    },
    result: { data: mockedData }
  },
  {
    request: {
      query: getMetricQUERY('devActivity'),
      variables: {
        metric: 'devActivity',
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10',
        transform: 'movingAverage',
        movingAverageIntervalBase: 7
      }
    },
    result: { data: mockedDevActivity }
  },
  {
    request: {
      query: getMetricQUERY('devActivity'),
      variables: {
        metric: 'devActivity',
        slug: 'santiment',
        interval: '1d',
        from: '2018-12-01',
        to: '2018-12-10',
        transform: 'movingAverage',
        movingAverageIntervalBase: 7
      }
    },
    result: { data: mockedDevActivity }
  }
)

describe('Fetch timeseries', () => {
  it('should return price succesfull', async () => {
    const client = await createClient(link)
    const action$ = ActionsObservable.of({
      type: actions.TIMESERIES_FETCH,
      payload: {
        id: 0,
        metrics: [
          {
            name: 'price_usd',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d'
          }
        ]
      }
    })
    const epic$ = fetchTimeseriesEpic(action$, mockStore({}), { client })
    const promise = epic$.toArray().toPromise()
    const result = await promise
    expect(result[0].type).toEqual(actions.TIMESERIES_FETCH_SUCCESS)
  })

  it('should return price + devActivity succesfull', async () => {
    const client = await createClient(link)
    const action$ = ActionsObservable.of({
      type: actions.TIMESERIES_FETCH,
      payload: {
        id: 0,
        metrics: [
          {
            name: 'price_usd',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d'
          },
          {
            name: 'devActivity',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d',
            transform: 'movingAverage',
            movingAverageIntervalBase: 7
          }
        ]
      }
    })
    const epic$ = fetchTimeseriesEpic(action$, mockStore({}), { client })
    const promise = epic$.toArray().toPromise()
    const result = await promise
    expect(result[0].type).toEqual(actions.TIMESERIES_FETCH_SUCCESS)
    expect(result).toMatchSnapshot()
  })

  it('should return price + devActivity as one merged timeseries array by datetime', async () => {
    const client = await createClient(link)
    const action$ = ActionsObservable.of({
      type: actions.TIMESERIES_FETCH,
      payload: {
        id: 0,
        metrics: [
          {
            name: 'price_usd',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d'
          },
          {
            name: 'devActivity',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d',
            transform: 'movingAverage',
            movingAverageIntervalBase: 7
          }
        ]
      }
    })
    const epic$ = fetchTimeseriesEpic(action$, mockStore({}), { client })
    const promise = epic$.toArray().toPromise()
    const result = await promise
    expect(result[0].type).toEqual(actions.TIMESERIES_FETCH_SUCCESS)
    expect(result).toMatchSnapshot()
  })

  it('should return error, if metric doesnt exist', async () => {
    const client = await createClient(link)
    const action$ = ActionsObservable.of({
      type: actions.TIMESERIES_FETCH,
      payload: {
        id: 0,
        metrics: [
          {
            name: 'anyStrangeMetric',
            from: '2018-12-01',
            to: '2018-12-10',
            slug: 'santiment',
            interval: '1d'
          }
        ]
      }
    })
    try {
      const epic$ = fetchTimeseriesEpic(action$, mockStore({}), { client })
      await epic$.toArray().toPromise()
    } catch (e) {
      expect(e).toBeDefined()
      expect(e).toMatchSnapshot()
    }
  })
})

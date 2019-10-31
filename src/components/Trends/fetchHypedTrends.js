import Raven from 'raven-js'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './actions'
import { SOCIALVOLUME_DATA_FETCH } from '../SocialVolumeWidget/actions'

const TRENDING_WORDS_QUERY = gql`
  query getTrendingWords($from: DateTime!, $to: DateTime!, $interval: Int!) {
    getTrendingWords(size: 10, from: $from, to: $to, interval: $interval) {
      datetime
      topWords {
        score
        word
      }
    }
  }
`

const handleError = error => {
  Raven.captureException(error)
  return Observable.of({
    type: actions.TRENDS_HYPED_FETCH_FAILED,
    payload: error
  })
}

export const selectHypedTrend = action$ =>
  action$
    .ofType(actions.TRENDS_HYPED_WORD_SELECTED)
    .switchMap(({ payload }) => {
      return payload
        ? Observable.from([
          {
            type: SOCIALVOLUME_DATA_FETCH,
            payload
          }
        ])
        : Observable.empty()
    })

const fetchTrends$ = ({ client, data = {} }) => {
  const from = new Date()
  const to = new Date()
  to.setHours(to.getHours(), 0, 0, 0)
  from.setHours(from.getHours() - 3, 0, 0, 0)

  const query = client.query({
    query: TRENDING_WORDS_QUERY,
    variables: {
      to: to.toISOString(),
      from: from.toISOString(),
      interval: '1h'
    },
    context: { isRetriable: true }
  })

  return Observable.from(query)
    .mergeMap(({ data: { getTrendingWords } }) => {
      return Observable.of({
        type: actions.TRENDS_HYPED_FETCH_SUCCESS,
        payload: {
          items: getTrendingWords,
          isLoading: false,
          error: false
        }
      })
    })
    .catch(handleError)
}

export const fetchHypedTrends = (action$, store, { client }) =>
  action$.ofType(actions.TRENDS_HYPED_FETCH).mergeMap(({ data = {} }) => {
    return Observable.merge(
      Observable.of({
        type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS,
        payload: {
          check: 'check'
        }
      }),
      fetchTrends$({ data, client })
    )
  })

import Raven from 'raven-js'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './actions'

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

const fetchTrends$ = ({ client, from, to, interval = '1h', onlyTrends }) => {
  let fromIso = from
  let toIso = to
  if (!from) {
    const from = new Date()
    const to = new Date()
    to.setHours(to.getHours(), 0, 0, 0)
    from.setHours(from.getHours() - 3, 0, 0, 0)

    toIso = to.toISOString()
    fromIso = from.toISOString()
  }

  const query = client.query({
    query: TRENDING_WORDS_QUERY,
    variables: {
      to: toIso,
      from: fromIso,
      interval
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
          error: false,
          onlyTrends
        }
      })
    })
    .catch(handleError)
}

export const fetchHypedTrends = (action$, store, { client }) =>
  action$
    .ofType(actions.TRENDS_HYPED_FETCH)
    .mergeMap(({ data = {}, payload }) => {
      return Observable.merge(
        payload.onlyTrends
          ? Observable.empty()
          : Observable.of({
            type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS,
            payload: {
              check: 'check'
            }
          }),
        fetchTrends$({ data, client, ...payload })
      )
    })

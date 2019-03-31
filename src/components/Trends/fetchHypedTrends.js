import Raven from 'raven-js'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import moment from 'moment'
import * as actions from './actions'
import { WORDCLOUD_CONTEXT_FETCH } from '../WordCloud/actions'
import { SOCIALVOLUME_DATA_FETCH } from '../SocialVolumeWidget/actions'

const TRENDING_WORDS_QUERY = gql`
  query trendingWords($from: DateTime!, $to: DateTime!, $hour: Int!) {
    trendingWords(source: ALL, size: 10, hour: $hour, from: $from, to: $to) {
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

const secretDataTeamHours = [1, 8, 14]

export const selectHypedTrend = action$ =>
  action$
    .ofType(actions.TRENDS_HYPED_WORD_SELECTED)
    .switchMap(({ payload }) => {
      return payload
        ? Observable.from([
          {
            type: WORDCLOUD_CONTEXT_FETCH,
            payload
          },
          {
            type: SOCIALVOLUME_DATA_FETCH,
            payload
          }
        ])
        : Observable.empty()
    })

const fetchTrends$ = ({ client, data = {} }) => {
  const startTime = Date.now()
  const queries = secretDataTeamHours.map(hour => {
    const toDate = new Date()
    toDate.setHours(24, 0, 0, 0)
    const fromDate = new Date()
    fromDate.setHours(24, 0, 0, 0)
    fromDate.setDate(fromDate.getDate() - 2)

    return client.query({
      query: TRENDING_WORDS_QUERY,
      variables: {
        hour,
        to: toDate.toISOString(),
        from: fromDate.toISOString()
      },
      context: { isRetriable: true }
    })
  })

  return Observable.forkJoin(queries)
    .delayWhen(() => Observable.timer(500 + startTime - Date.now()))
    .mergeMap(data => {
      const trends = data
        .reduce((acc, val, index) => {
          const { data = [] } = val
          data.trendingWords.forEach(el => {
            acc.push({
              ...el,
              datetime: moment(el.datetime)
                .add(secretDataTeamHours[index], 'hours')
                .utc()
                .format()
            })
          })
          return acc
        }, [])
        .sort((a, b) => (moment(a.datetime).isAfter(b.datetime) ? 1 : -1))
        .reverse()
        .filter((_, index) => index < 3)
        .reverse()
      return Observable.of({
        type: actions.TRENDS_HYPED_FETCH_SUCCESS,
        payload: {
          items: trends,
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

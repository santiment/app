import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { wordCloudGQL } from './wordCloudGQL.js'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { TRENDS_HYPED_FETCH_SUCCESS } from '../Trends/actions'

const trendsWordCloudCache = new Map()

const saveWordCloudToCache = (word, { data: { wordContext } }) => {
  trendsWordCloudCache.set(word, wordContext)
}

export const preloadWordContextEpic = (action$, store, { client }) =>
  action$
    .ofType(TRENDS_HYPED_FETCH_SUCCESS)
    .switchMap(({ payload: { items } }) => {
      if (window.innerWidth < 768) {
        return Observable.of()
      }

      const dateTo = moment().toISOString()
      const dateFrom = moment()
        .subtract(3, 'd')
        .toISOString()
      const allWords = items.reduce(
        (acc, { topWords }) => acc.concat(topWords.map(({ word }) => word)),
        []
      )
      const words = [...new Set(allWords)]

      words.map(word =>
        client
          .query({
            query: wordCloudGQL,
            variables: {
              word,
              to: dateTo,
              from: dateFrom,
              size: 25
            }
          })
          .then(data => saveWordCloudToCache(word, data))
          .catch(
            handleErrorAndTriggerAction(
              actions.WORDCLOUD_CONTEXT_TRENDS_PRELOAD_FAILED
            )
          )
      )

      return Observable.empty()
    })

export const fetchWordContextEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.WORDCLOUD_CONTEXT_FETCH)
    .switchMap(({ payload: word }) => {
      const wordCloudState = store.getState().wordCloud
      if (wordCloudState.word === word) {
        return Observable.of({
          type: actions.WORDCLOUD_CONTEXT_FETCH_CANCEL,
          payload: 'New word is same as the last word'
        })
      }

      const trendContext = trendsWordCloudCache.get(word)

      if (trendContext) {
        return Observable.of({
          type: actions.WORDCLOUD_CONTEXT_FETCH_SUCCESS,
          payload: {
            word,
            cloud: trendContext
          }
        })
      }

      return Observable.fromPromise(
        client.query({
          query: wordCloudGQL,
          variables: {
            word,
            to: moment().toISOString(),
            from: moment()
              .subtract(3, 'd') // @NOTE(vanguard) query fails, if the value is more in past
              .toISOString(),
            size: 25
          }
        })
      )
        .mergeMap(({ data: { wordContext } }) => {
          return Observable.of({
            type: actions.WORDCLOUD_CONTEXT_FETCH_SUCCESS,
            payload: {
              word,
              cloud: wordContext
            }
          })
        })
        .catch(
          handleErrorAndTriggerAction(actions.WORDCLOUD_CONTEXT_FETCH_FAILED)
        )
    })

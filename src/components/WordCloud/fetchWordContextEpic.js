import { Observable } from 'rxjs'
import * as actions from './actions'
import { wordCloudGQL } from './wordCloudGQL.js'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { TRENDS_HYPED_FETCH_SUCCESS } from '../Trends/actions'
import { getTimeIntervalFromToday } from '../../utils/dates'

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

      const { from, to } = getTimeIntervalFromToday(-3, 'd')

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
              to: to.toISOString(),
              from: from.toISOString(),
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
    .debounceTime(200)
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

      const { from, to } = getTimeIntervalFromToday(-3, 'd')

      return Observable.fromPromise(
        client.query({
          query: wordCloudGQL,
          variables: {
            word,
            to: to.toISOString(),
            from: from.toISOString(),
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

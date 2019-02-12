import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { wordCloudGQL } from './wordCloudGQL.js'
import { handleErrorAndTriggerAction } from '../../epics/utils'

export const preloadWordContextEpic = (action$, store, { client }) =>
  action$
    .ofType('[trends] HYPED_FETCH_SUCCESS')
    .switchMap(({ payload: { items } }) => {
      const dateTo = moment().toISOString()
      const dateFrom = moment()
        .subtract(3, 'd')
        .toISOString()
      const allWords = items.reduce(
        (acc, { topWords }) => acc.concat(topWords.map(({ word }) => word)),
        []
      )
      const words = [...new Set(allWords)]

      return Observable.from(
        words.map(word =>
          client.query({
            query: wordCloudGQL,
            variables: {
              word,
              to: dateTo,
              from: dateFrom,
              size: 25
            }
          })
        )
      )
        .concatAll()
        .toArray()
        .mergeMap(items => {
          const wordContextMap = {}
          items.forEach((item, i) => {
            wordContextMap[words[i]] = item.data.wordContext
          })
          console.log(wordContextMap)
          return Observable.of({
            type: actions.WORDCLOUD_CONTEXT_TRENDS,
            payload: wordContextMap
          })
        })
    })

export const fetchWordContextEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.WORDCLOUD_CONTEXT_FETCH)
    .switchMap(({ payload: word }) => {
      if (store.getState().wordCloud.word === word) {
        return Observable.of({
          type: actions.WORDCLOUD_CONTEXT_FETCH_CANCEL,
          payload: 'New word is same as the last word'
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

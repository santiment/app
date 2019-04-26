import { Observable } from 'rxjs'
import * as actions from './actions'
import { NEWS_QUERY } from './NewsGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { getTimeIntervalFromToday } from '../../utils/dates'

export const fetchNewsEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.NEWS_DATA_FETCH)
    .debounceTime(200)
    .switchMap(({ payload: word }) => {
      if (store.getState().news.word === word) {
        return Observable.of({ type: actions.NEWS_DATA_FETCH_CANCEL })
      }

      const { from, to } = getTimeIntervalFromToday(-3, 'd')

      return Observable.fromPromise(
        client.query({
          query: NEWS_QUERY,
          variables: {
            tag: word,
            to: to.toISOString(),
            from: from.toISOString(),
            size: 6
          }
        })
      )
        .switchMap(({ data: { news } }) => {
          return Observable.of({
            type: actions.NEWS_DATA_FETCH_SUCCESS,
            payload: { word, data: news.reverse() }
          })
        })
        .catch(handleErrorAndTriggerAction(actions.NEWS_DATA_FETCH_FAILED))
    })

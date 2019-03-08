import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from './insightsGQL'

export const INSIGHTS_LIKE = '[voting] INSIGHTS_LIKE'
export const INSIGHT_LIKE_FAIL = '[voting] INSIGHTS_LIKE_FAIL'

export const likesEpic = (action$, store, { client }) =>
  action$
    .ofType(INSIGHTS_LIKE)
    .debounceTime(300)
    .mergeMap(({ payload: { id, shouldLike } }) => {
      return Observable.from(
        client.mutate({
          mutation: shouldLike
            ? LIKE_INSIGHT_MUTATION
            : UNLIKE_INSIGHT_MUTATION,
          variables: {
            id: +id
          }
        })
      )
        .switchMap(() => Observable.empty())
        .catch(handleErrorAndTriggerAction(INSIGHT_LIKE_FAIL))
    })

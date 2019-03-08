import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from './likesGQL'
import * as actions from './actions'

export const likesEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.INSIGHTS_LIKE)
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
        .catch(handleErrorAndTriggerAction(actions.INSIGHT_LIKE_FAIL))
    })

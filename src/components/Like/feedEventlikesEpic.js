import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import {
  LIKE_FEED_EVENT_MUTATION,
  UNLIKE_FEED_EVENT_MUTATION
} from './likesGQL'
import * as actions from './actions'

export const feedEventlikesEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.FEED_EVENT_LIKE)
    .debounceTime(300)
    .mergeMap(({ payload: { id, shouldLike } }) => {
      return Observable.from(
        client.mutate({
          mutation: shouldLike
            ? LIKE_FEED_EVENT_MUTATION
            : UNLIKE_FEED_EVENT_MUTATION,
          variables: {
            timelineEventId: +id
          }
        })
      )
        .switchMap(() => Observable.empty())
        .catch(handleErrorAndTriggerAction(actions.FEED_EVENT_LIKE_FAIL))
    })

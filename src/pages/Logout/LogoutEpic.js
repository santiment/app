import { Observable } from 'rxjs'
import * as actions from './../../actions/types'
import { LogoutGQL } from './LogoutGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'

const logoutEpic = (action$, store, { client }) =>
  action$.ofType(actions.USER_LOGOUT).mergeMap(() =>
    Observable.from(client.mutate({ mutation: LogoutGQL }))
      .concatMap(({ data: { logout: { success } } }) =>
        success
          ? Observable.of({ type: actions.USER_LOGOUT_SUCCESS })
          : Observable.of({ type: actions.USER_LOGOUT_ERROR })
      )
      .catch(handleErrorAndTriggerAction(actions.USER_LOGOUT_ERROR))
  )

export default logoutEpic

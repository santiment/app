import { ofType } from 'redux-observable'
import { skip, map } from 'rxjs/operators'
import { showNotification } from './../actions/rootActions'
import { APP_CHANGE_ONLINE_STATUS } from './../actions/types'

const notificationMsg = isOnline =>
  isOnline ? 'You are online' : 'You are offline'

const handleOffline = (action$, store, { client }) =>
  action$.pipe(
    ofType(APP_CHANGE_ONLINE_STATUS),
    skip(1),
    map(({ payload: { isOnline = true } }) => {
      return showNotification(notificationMsg(isOnline))
    })
  )

export default handleOffline

import {
  SHOW_NOTIFICATION,
  APP_CHANGE_ONLINE_STATUS,
  APP_LAUNCHED
} from './types'

export const showNotification = (payload = { title: 'Empty message' }) => {
  const newPayload = typeof payload === 'string' ? { title: payload } : payload

  const notificationId = Date.now()

  newPayload.variant = newPayload.variant || 'info'
  newPayload.dismissAfter = newPayload.dismissAfter || 4000

  return {
    type: SHOW_NOTIFICATION,
    payload: {
      ...newPayload,
      solidFill: true,
      key: notificationId,
      id: notificationId
    }
  }
}

export const changeNetworkStatus = newtworkStatus => ({
  type: APP_CHANGE_ONLINE_STATUS,
  payload: {
    isOnline: newtworkStatus
  }
})

export const launchApp = () => ({ type: APP_LAUNCHED })

import {
  SHOW_NOTIFICATION,
  APP_CHANGE_ONLINE_STATUS,
  APP_LAUNCHED
} from './types'

const defaultNotification = {
  title: 'Empty message',
  description: undefined,
  variant: 'info'
}

export const showNotification = (payload = defaultNotification) => {
  const newPayload =
    typeof payload === 'string'
      ? {
        ...defaultNotification,
        title: payload
      }
      : payload

  const notificationId = Date.now()

  return {
    type: SHOW_NOTIFICATION,
    payload: {
      ...newPayload,
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

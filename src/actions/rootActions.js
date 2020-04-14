import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  APP_CHANGE_ONLINE_STATUS,
  USER_DIGEST_CHANGE,
  APP_LAUNCHED
} from './types'

export const showNotification = (payload = { title: 'Empty message' }) => {
  const newPayload = typeof payload === 'string' ? { title: payload } : payload

  return {
    type: SHOW_NOTIFICATION,
    payload: {
      ...newPayload,
      id: Date.now()
    }
  }
}

export const hideNotification = id => ({
  type: HIDE_NOTIFICATION,
  payload: {
    id
  }
})

export const changeNetworkStatus = newtworkStatus => ({
  type: APP_CHANGE_ONLINE_STATUS,
  payload: {
    isOnline: newtworkStatus
  }
})

export const changeDigestSubscription = (type = 'WEEKLY') => ({
  type: USER_DIGEST_CHANGE,
  payload: type
})

export const launchApp = () => ({ type: APP_LAUNCHED })

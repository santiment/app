import { SHOW_NOTIFICATION } from './../actions/types.js'

export const initialState = {
  notification: null
}

const defaultNotificationState = {
  key: 'any UID',
  title: `Notification ipsum...`,
  description: undefined,
  variant: 'info',
  dismissAfter: 4000,
  actions: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...defaultNotificationState,
        ...action.payload
      }
    default:
      return state
  }
}

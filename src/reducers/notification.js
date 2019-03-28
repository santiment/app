import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './../actions/types.js'

export const initialState = {
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        notifications: [
          ...state.notifications,
          {
            variant: 'info',
            solidFill: true,
            dismissAfter: 4000,
            ...action.payload
          }
        ]
      }

    case HIDE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          ({ id }) => id !== action.payload.id
        )
      }

    default:
      return state
  }
}

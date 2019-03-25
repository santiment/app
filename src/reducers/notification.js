import { SHOW_NOTIFICATION } from './../actions/types.js'

export const initialState = {
  notification: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.payload

    default:
      return state
  }
}

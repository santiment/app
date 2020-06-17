import * as actions from './actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_APP_AVAILABLE:
      return {
        ...state,
        isUpdateAvailable: true
      }
    default:
      return state
  }
}

import * as actions from './actions'

export const initialState = {}

export const APP_STATES = {
  LATEST: 'latest',
  NEW_AVAILABLE: 'new_available'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_APP_AVAILABLE:
      return {
        ...state,
        appVersionState: APP_STATES.NEW_AVAILABLE
      }
    case actions.IS_LATEST_APP:
      return {
        ...state,
        appVersionState: APP_STATES.LATEST
      }
    default:
      return state
  }
}

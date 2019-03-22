import * as actions from './actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNAL_FETCH_HISTORY_POINTS:
      return {
        ...state
      }
    case actions.SIGNAL_FETCH_HISTORY_POINTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.SIGNAL_FETCH_HISTORY_POINTS_FAILED:
      return {
        ...initialState,
        isError: true,
        error: { ...action.payload }
      }
    default:
      return state
  }
}

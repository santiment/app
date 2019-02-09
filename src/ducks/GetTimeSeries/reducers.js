import * as actions from './actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TIMESERIES_FETCH:
      return {
        ...state
      }
    case actions.TIMESERIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

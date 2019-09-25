import * as actions from './actions'

export const initialState = {
  assets: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.MARKET_SEGMENTS_FETCH:
      return {
        ...state,
        loading: true
      }
    case actions.MARKET_SEGMENTS_FETCH_SUCCESS:
      return {
        loading: false,
        error: false,
        ...action.payload
      }
    default:
      return state
  }
}

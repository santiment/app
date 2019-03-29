import * as actions from './actions'

export const initialState = {
  isLoading: false,
  error: false,
  gainersAndLosers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_GAINERS_LOSERS:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_GAINERS_LOSERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: false
      }
    case actions.FETCH_GAINERS_LOSERS_FAILED:
      return {
        isLoading: false,
        error: true,
        gainersAndLosers: []
      }
    case actions.FETCH_GAINERS_LOSERS_CANCEL:
      return {
        ...state,
        isLoading: false,
        error: false
      }
    case actions.CLEAN_GAINERS_LOSERS:
      return { ...initialState }
    default:
      return state
  }
}

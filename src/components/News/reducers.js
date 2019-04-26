import * as actions from './actions'

export const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  word: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.NEWS_DATA_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case actions.NEWS_DATA_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false
      }
    case actions.NEWS_DATA_FETCH_FAILED:
      return {
        isLoading: false,
        isError: true,
        data: []
      }
    case actions.NEWS_DATA_FETCH_CANCEL:
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    default:
      return state
  }
}

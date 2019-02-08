import * as actions from './actions'

export const initialState = {
  isLoading: false,
  error: false,
  data: undefined,
  trendWord: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SOCIALVOLUME_DATA_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case actions.SOCIALVOLUME_DATA_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: false
      }
    case actions.SOCIALVOLUME_DATA_FETCH_FAILED:
      return {
        isLoading: false,
        error: true,
        data: []
      }

    case actions.SOCIALVOLUME_DATA_FETCH_CANCEL:
      return {
        ...state,
        isLoading: false,
        error: false
      }
    default:
      return state
  }
}

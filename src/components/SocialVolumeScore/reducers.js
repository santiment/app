import * as actions from './actions'

export const initialState = {
  isLoading: false,
  error: false,
  socialVolume: undefined,
  slug: ''
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
        ...action.payload
      }
    case actions.SOCIALVOLUME_DATA_FETCH_FAILED:
      return {
        isLoading: false,
        error: true,
        socialVolume: []
      }

    default:
      return state
  }
}

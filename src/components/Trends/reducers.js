import * as actions from './actions'

export const initialState = {
  isLoading: true,
  error: false,
  items: [],
  selected: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TRENDS_HYPED_FETCH:
      return initialState
    case actions.TRENDS_HYPED_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.TRENDS_HYPED_FETCH_FAILED:
      return {
        isLoading: false,
        error: true,
        items: []
      }
    case actions.TRENDS_HYPED_WORD_SELECTED:
      const { selected } = action.payload
      return {
        ...state,
        selected
      }
    default:
      return state
  }
}

import * as actions from './actions'

export const initialState = {
  isLoading: false,
  error: false,
  cloud: undefined,
  word: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.WORDCLOUD_CONTEXT_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case actions.WORDCLOUD_CONTEXT_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.WORDCLOUD_CONTEXT_FETCH_FAILED:
      return {
        isLoading: false,
        error: true,
        cloud: []
      }

    default:
      return state
  }
}

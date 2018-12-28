import * as actions from './actions'

const defaultWords = [
  { word: 'word', score: 74 },
  { word: 'context', score: 74 },
  { word: 'cloud', score: 73 },
  { word: 'money', score: 72 },
  { word: 'crypto', score: 46 },
  { word: 'bank', score: 25 },
  { word: 'block', score: 7 },
  { word: 'project', score: 6 },
  { word: 'ico', score: 5 },
  { word: 'hidden', score: 4 },
  { word: 'blockchain', score: 3 },
  { word: 'coins', score: 2 },
  { word: 'stable', score: 1 },
  { word: 'nodes', score: 0 },
  { word: 'liquidity', score: 5 }
]

export const initialState = {
  isLoading: false,
  error: false,
  cloud: defaultWords,
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

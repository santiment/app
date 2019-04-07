import * as actions from './actions'

export const initialState = {
  isLoading: true,
  error: false,
  items: [],
  selected: null,
  scoreChange: {},
  volumeChange: {},
  allAssets: [],
  connectedTrends: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TRENDS_HYPED_FETCH:
      return { ...initialState, connectedTrends: state.connectedTrends }
    case actions.TRENDS_HYPED_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.TRENDS_HYPED_FETCH_FAILED:
      return {
        isLoading: false,
        error: true,
        items: [],
        connectedTrends: state.connectedTrends
      }
    case actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_FAILED:
      return {
        allAssets: []
      }
    case actions.TRENDS_HYPED_WORD_SELECTED:
      return {
        ...state,
        selected: action.payload
      }
    case actions.TREND_WORD_SCORE_CHANGE_FULFILLED:
      return {
        ...state,
        scoreChange: action.payload
      }
    case actions.TREND_WORD_VOLUME_CHANGE_FULFILLED:
      return {
        ...state,
        volumeChange: action.payload
      }

    case actions.TRENDS_CONNECTED_WORDS_SUCCESS:
      return {
        ...state,
        connectedTrends: action.payload
      }

    default:
      return state
  }
}

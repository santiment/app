import * as actions from './actions'

export const initialState = {
  isLoading: true,
  error: false,
  items: [],
  selected: null,
  volumeChange: {},
  allAssets: [],
  connectedTrends: {},
  TrendToInsights: {},
  TrendToTag: {},
  selectedTrends: new Set()
}

const normalizeSelectedTrends = (
  selectedTrends,
  newSelectedTrends,
  TrendToTag
) => {
  const newState = new Set([...selectedTrends])

  newSelectedTrends.forEach(trend => {
    const ticker = TrendToTag[trend.toUpperCase()]
    if (ticker) {
      newState.add(ticker.toLowerCase())
    } else {
      newState.add(trend)
    }
  })

  return newState
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TRENDS_HYPED_FETCH:
      return {
        ...initialState,
        connectedTrends: state.connectedTrends,
        TrendToInsights: state.TrendToInsights,
        TrendToTag: state.TrendToTag
      }
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
        selected: encodeURIComponent(action.payload)
      }
    case actions.TREND_WORD_VOLUME_CHANGE_FULFILLED:
      return {
        ...state,
        volumeChange: action.payload
      }

    case actions.TRENDS_CONNECTED_WORDS_SUCCESS:
      return {
        ...state,
        connectedTrends: action.payload.connectedTrends,
        TrendToInsights: action.payload.TrendToInsights,
        TrendToTag: action.payload.TrendToTag
      }

    case actions.TRENDS_SELECTED_WORDS:
      return {
        ...state,

        selectedTrends: normalizeSelectedTrends(
          state.selectedTrends,
          action.payload,
          state.TrendToTag
        )
      }

    case actions.TRENDS_SELECTED_WORDS_CLEAR:
      return {
        ...state,
        selectedTrends: new Set()
      }

    default:
      return state
  }
}

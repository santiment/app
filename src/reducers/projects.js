import * as actions from './../actions/types'

export const initialState = {
  isLoading: true,
  error: false,
  filters: {
    minVolume: 0
  },
  items: [],
  trendingAssets: [],
  isCurrentUserTheAuthor: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ASSETS_FETCH:
      return {
        ...state,
        isLoading: true,
        error: false,
        trendingAssets: []
      }
    case actions.ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        isCurrentUserTheAuthor: false,
        isLoading: false,
        error: false,
        items: [],
        trendingAssets: [],
        isPublicWatchlist: false,
        ...action.payload,
        timestamp: Date.now()
      }
    default:
      return state
  }
}

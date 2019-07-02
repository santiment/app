import * as actions from './../actions/types'

export const initialState = {
  assets: [],
  watchlists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.RECENT_ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        assets: action.payload
      }

    case actions.RECENT_WATCHLISTS_FETCH_SUCCESS:
      return {
        ...state,
        watchlists: action.payload
      }

    default:
      return state
  }
}

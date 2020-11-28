import * as actions from './../actions/types'

export const initialState = { assets: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.RECENT_ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        assets: action.payload
      }
    default:
      return state
  }
}

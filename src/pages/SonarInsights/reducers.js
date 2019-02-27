import * as actions from './actions'

export const initialState = {
  id: undefined,
  updatedAt: undefined,
  updating: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.INSIGHT_DRAFT_UPDATE:
      return {
        ...state,
        updating: true
      }
    case actions.INSIGHT_DRAFT_UPDATE_SUCCESS:
      return {
        ...action.payload,
        updating: false
      }
    case actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE:
      return initialState

    default:
      return state
  }
}

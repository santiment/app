import * as actions from './actions'

export const initialState = {
  id: undefined,
  updatedAt: undefined,
  isUpdating: false,
  isPublished: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.INSIGHT_DRAFT_UPDATE:
    case actions.INSIGHT_DRAFT_PUBLISH:
      return {
        ...state,
        isUpdating: true
      }
    case actions.INSIGHT_DRAFT_PUBLISH_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        isPublished: true
      }
    case actions.INSIGHT_DRAFT_UPDATE_SUCCESS:
      return {
        ...action.payload,
        isUpdating: false
      }
    case actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE:
      return initialState

    default:
      return state
  }
}

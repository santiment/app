import * as actions from './actions'

export const initialState = {
  id: undefined,
  updatedAt: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.INSIGHT_DRAFT_UPDATE_SUCCESS:
      return {
        ...action.payload
      }
    case actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE:
      return initialState

    default:
      return state
  }
}

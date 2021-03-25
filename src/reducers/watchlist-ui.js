import * as actions from './../actions/types'

export const initialState = {
  selectedId: null,
  editableAssetsInList: [],
  editableWatchlists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_REMOVE_ASSET_FROM_LIST:
      return {
        ...state,
        editableAssetsInList: [
          ...state.editableAssetsInList,
          {
            projectId: action.payload.projectId,
            assetsListId: action.payload.assetsListId
          }
        ]
      }
    case actions.USER_REMOVED_ASSET_FROM_LIST_SUCCESS:
      return {
        ...state,
        editableAssetsInList: state.editableAssetsInList.filter(
          ({ projectId, assetsListId }) =>
            projectId !== action.payload.projectId &&
            assetsListId !== action.payload.assetsListId
        )
      }
    case actions.USER_ADD_ASSET_TO_LIST:
      return {
        ...state,
        editableAssetsInList: [
          ...state.editableAssetsInList,
          {
            projectId: action.payload.projectId,
            assetsListId: action.payload.assetsListId
          }
        ]
      }
    case actions.USER_ADD_ASSET_TO_LIST_SUCCESS:
      return {
        ...state,
        editableAssetsInList: state.editableAssetsInList.filter(
          ({ projectId, assetsListId }) =>
            projectId !== action.payload.projectId &&
            assetsListId !== action.payload.assetsListId
        )
      }
    case actions.USER_EDIT_ASSETS_IN_LIST:
      return {
        ...state,
        editableWatchlists: [
          ...state.editableWatchlists,
          action.payload.assetsListId
        ]
      }
    case actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS:
      return {
        ...state,
        editableWatchlists: state.editableWatchlists.filter(
          id => id !== action.payload.assetsListId
        )
      }
    default:
      return state
  }
}

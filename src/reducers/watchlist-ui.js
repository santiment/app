import * as actions from './../actions/types'

export const initialState = {
  selectedId: null,
  newItemPending: false,
  newItemFailed: false,
  newItemSuccess: false,
  statusDeleteAssetList: null,
  editableAssetsInList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_ADD_NEW_ASSET_LIST:
      return {
        ...state,
        newItemPending: true
      }
    case actions.USER_ADD_NEW_ASSET_LIST_SUCCESS:
      return {
        ...state,
        newItemSuccess: true,
        newItemFailed: false,
        newItemPending: false
      }
    case actions.USER_ADD_NEW_ASSET_LIST_FAILED:
      return {
        ...state,
        newItemFailed: true,
        newItemSuccess: false,
        newItemPending: false
      }
    case actions.USER_ADD_NEW_ASSET_LIST_CANCEL:
      return {
        ...initialState
      }
    case actions.USER_REMOVE_ASSET_LIST:
      return {
        ...state,
        statusDeleteAssetList: 'PENDING'
      }
    case actions.USER_REMOVE_ASSET_LIST_SUCCESS:
      return {
        ...state,
        statusDeleteAssetList: 'SUCCESS'
      }
    case actions.USER_REMOVE_ASSET_LIST_FAILED:
      return {
        ...state,
        statusDeleteAssetList: 'FAILED'
      }
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
    default:
      return state
  }
}

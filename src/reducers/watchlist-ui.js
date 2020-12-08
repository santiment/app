import * as actions from './../actions/types'
import { loadKeyState } from '../utils/localStorage'
import { CATEGORIES_SETTINGS } from '../ducks/Watchlists/Widgets/Table/columns.js'

const settings = loadKeyState('watchlistsSettings') || {}

export const initialState = {
  selectedId: null,
  newItemPending: false,
  newItemFailed: false,
  newItemSuccess: false,
  editableAssetsInList: [],
  editableWatchlists: [],
  watchlistsSettings: { ...CATEGORIES_SETTINGS, ...settings }
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
    case actions.WATCHLISTS_SETTINGS_FETCH_SUCCESS:
      return {
        ...state,
        watchlistsSettings: {
          ...state.watchlistsSettings,
          ...action.payload
        }
      }
    case actions.WATCHLIST_SETTINGS_SAVE_SUCCESS:
      const { key, ...rest } = action.payload
      const list = state.watchlistsSettings[key]
        ? { ...state.watchlistsSettings[key], ...rest }
        : { ...rest }
      return {
        ...state,
        watchlistsSettings: {
          ...state.watchlistsSettings,
          [key]: list
        }
      }
    default:
      return state
  }
}

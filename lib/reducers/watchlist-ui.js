function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as actions from './../actions/types';
export const initialState = {
  selectedId: null,
  editableAssetsInList: [],
  editableWatchlists: []
};
export default ((state = initialState, action) => {
  switch (action.type) {
    case actions.USER_REMOVE_ASSET_FROM_LIST:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableAssetsInList: [...state.editableAssetsInList, {
          projectId: action.payload.projectId,
          assetsListId: action.payload.assetsListId
        }]
      });

    case actions.USER_REMOVED_ASSET_FROM_LIST_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableAssetsInList: state.editableAssetsInList.filter(({
          projectId,
          assetsListId
        }) => projectId !== action.payload.projectId && assetsListId !== action.payload.assetsListId)
      });

    case actions.USER_ADD_ASSET_TO_LIST:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableAssetsInList: [...state.editableAssetsInList, {
          projectId: action.payload.projectId,
          assetsListId: action.payload.assetsListId
        }]
      });

    case actions.USER_ADD_ASSET_TO_LIST_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableAssetsInList: state.editableAssetsInList.filter(({
          projectId,
          assetsListId
        }) => projectId !== action.payload.projectId && assetsListId !== action.payload.assetsListId)
      });

    case actions.USER_EDIT_ASSETS_IN_LIST:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableWatchlists: [...state.editableWatchlists, action.payload.assetsListId]
      });

    case actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        editableWatchlists: state.editableWatchlists.filter(id => id !== action.payload.assetsListId)
      });

    default:
      return state;
  }
});
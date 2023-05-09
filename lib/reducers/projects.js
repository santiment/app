function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as actions from './../actions/types';
export const initialState = {
  isLoading: true,
  error: false,
  filters: {
    minVolume: 0
  },
  items: [],
  trendingAssets: [],
  isCurrentUserTheAuthor: false
};
export default ((state = initialState, action) => {
  switch (action.type) {
    case actions.ASSETS_FETCH:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: true,
        error: false,
        trendingAssets: []
      });

    case actions.ASSETS_FETCH_SUCCESS:
      return _objectSpread(_objectSpread(_objectSpread({}, state), {}, {
        isCurrentUserTheAuthor: false,
        isLoading: false,
        error: false,
        items: [],
        trendingAssets: [],
        isPublicWatchlist: false
      }, action.payload), {}, {
        timestamp: Date.now()
      });

    default:
      return state;
  }
});
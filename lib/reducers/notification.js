function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './../actions/types.js';
export const initialState = {
  notifications: []
};
export default ((state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        notifications: [...state.notifications, _objectSpread({
          variant: 'info',
          dismissAfter: 4000
        }, action.payload)]
      };

    case HIDE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(({
          id
        }) => id !== action.payload.id)
      };

    default:
      return state;
  }
});
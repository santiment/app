function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, APP_CHANGE_ONLINE_STATUS, APP_LAUNCHED } from './types';
export const showNotification = (payload = {
  title: 'Empty message'
}) => {
  const newPayload = typeof payload === 'string' ? {
    title: payload
  } : payload;
  return {
    type: SHOW_NOTIFICATION,
    payload: _objectSpread(_objectSpread({}, newPayload), {}, {
      id: Date.now()
    })
  };
};
export const hideNotification = id => ({
  type: HIDE_NOTIFICATION,
  payload: {
    id
  }
});
export const changeNetworkStatus = newtworkStatus => ({
  type: APP_CHANGE_ONLINE_STATUS,
  payload: {
    isOnline: newtworkStatus
  }
});
export const launchApp = () => ({
  type: APP_LAUNCHED
});
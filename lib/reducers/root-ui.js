function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as actions from './../actions/types';
import { loadKeyState } from '../utils/localStorage';
import { updateIsBetaMode } from '../stores/ui';
const isNightMode = loadKeyState('isNightMode');
const isNightModeDeprecated = loadKeyState('isNightModeEnabled');
const isBetaMode = loadKeyState('isBetaMode');
const isBetaModeDeprecated = loadKeyState('isBetaModeEnabled');
const isNightModeEnabled = (isNightMode !== undefined ? isNightMode : isNightModeDeprecated) || false;
const isBetaModeEnabled = isBetaMode !== undefined ? isBetaMode : isBetaModeDeprecated || false;
export const initialState = {
  isOnline: true,
  loginSuccess: false,
  loginError: false,
  isNightModeEnabled: isNightModeEnabled,
  isBetaModeEnabled: isBetaModeEnabled
};
export default ((state = initialState, action) => {
  switch (action.type) {
    case actions.APP_CHANGE_ONLINE_STATUS:
      return _objectSpread(_objectSpread({}, state), {}, {
        isOnline: action.payload.isOnline
      });

    case actions.USER_LOGIN_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        loginSuccess: true
      });

    case actions.USER_LOGIN_FAILED:
      return _objectSpread(_objectSpread({}, state), {}, {
        loginSuccess: false,
        loginError: true
      });

    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return _objectSpread({}, state);

    case actions.APP_USER_NIGHT_MODE_SAVE:
      return _objectSpread(_objectSpread({}, state), {}, {
        isNightModeEnabled: action.payload
      });

    case actions.APP_USER_BETA_MODE_SAVE:
      updateIsBetaMode(action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        isBetaModeEnabled: action.payload
      });

    default:
      return state;
  }
});
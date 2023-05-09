function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { setContext } from 'apollo-link-context';
import { loadState } from './../utils/localStorage';
const origin = window.location.origin;
const AuthLink = setContext((_, {
  headers
}) => {
  // get the authentication token from local storage if it exists
  const token = loadState() ? loadState().token : undefined;
  const authHeaders = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return {
    headers: _objectSpread(_objectSpread(_objectSpread({}, headers), authHeaders), {}, {
      origin
    })
  };
});
export default AuthLink;
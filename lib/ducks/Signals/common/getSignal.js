function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as qs from 'query-string';
import { TRIGGER_BY_ID_QUERY } from './queries';
import { useQuery } from '@apollo/react-hooks';
export const getShareSignalParams = (params = {}) => {
  const {
    search,
    hash
  } = window.location || {};
  const parsedSignalParams = qs.parse(search, {
    arrayFormat: 'comma'
  });
  const isShared = hash === '#shared' || params.id && Object.keys(parsedSignalParams).length > 0;

  const triggerParams = _objectSpread({
    isShared
  }, parsedSignalParams);

  Object.keys(triggerParams).forEach(key => triggerParams[key] === undefined || triggerParams[key] === '' ? delete triggerParams[key] : '');
  return triggerParams;
};
export const useSignal = ({
  triggerId,
  skip
}) => {
  const {
    data,
    loading,
    error
  } = useQuery(TRIGGER_BY_ID_QUERY, {
    skip: skip || !triggerId,
    variables: {
      id: +triggerId
    }
  });
  return {
    data,
    loading,
    error
  };
};
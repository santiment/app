function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext, useState, useEffect } from 'react';
import { getAllInsights, getPulseInsights, getTagInsights, getSANFAMInsights, getMyInsights, getProInsights, getFollowingsInsights } from './queries';
const DEFAULT_STATE = [];
const DEFAULT_ERROR_MSG = {};
const LoadInsights = {
  all: getAllInsights,
  pro: getProInsights,
  pulse: getPulseInsights,
  my: getMyInsights,
  followings: getFollowingsInsights,
  sanfam: getSANFAMInsights
};
const InsightsContext = /*#__PURE__*/React.createContext();
const InsightsToggleContext = /*#__PURE__*/React.createContext();
const InsightsActiveToggleContext = /*#__PURE__*/React.createContext();
const InsightsErrorContext = /*#__PURE__*/React.createContext();
export function loadInsights(key, from, to) {
  const loader = LoadInsights[key] || getTagInsights;
  return loader(from, to, key);
}
export const InsightsProvider = ({
  children
}) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [[toggle, from, to], setToggle] = useState(DEFAULT_STATE);
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG);
  useEffect(() => {
    const {
      my,
      followings
    } = ErrorMsg;
    setErrorMsg({
      my,
      followings
    });
  }, [from, to]);
  useEffect(() => {
    if (!toggle) {
      return setState(DEFAULT_STATE);
    }

    let race = false;
    const {
      key
    } = toggle;
    const loadInsights = LoadInsights[key] || getTagInsights;
    loadInsights(from, to, key).then(insights => {
      if (race) return;

      if (!insights.length) {
        throw new Error('No data');
      }

      setState(insights);
    }).catch(({
      message
    }) => {
      if (race) return;
      setErrorMsg(state => _objectSpread(_objectSpread({}, state), {}, {
        [key]: message
      }));
      setState(DEFAULT_STATE);
    });
    return () => race = true;
  }, [toggle, from, to]);

  function toggleInsight(newToggle, newFrom, newTo) {
    if (newFrom !== from || newTo !== to) {
      setToggle([newToggle, newFrom, newTo]);
    } else {
      setToggle([newToggle === toggle ? undefined : newToggle, newFrom, newTo]);
    }
  }

  return /*#__PURE__*/React.createElement(InsightsContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(InsightsActiveToggleContext.Provider, {
    value: toggle
  }, /*#__PURE__*/React.createElement(InsightsErrorContext.Provider, {
    value: ErrorMsg
  }, /*#__PURE__*/React.createElement(InsightsToggleContext.Provider, {
    value: toggleInsight
  }, children))));
};
export const useInsights = () => useContext(InsightsContext);
export const useToggleInsight = () => useContext(InsightsToggleContext);
export const useInsightsErrorMsg = () => useContext(InsightsErrorContext);
export const useActiveToggleInsight = () => useContext(InsightsActiveToggleContext);
export const withInsightsProvider = Component => props => /*#__PURE__*/React.createElement(InsightsProvider, null, /*#__PURE__*/React.createElement(Component, props));
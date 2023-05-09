function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { newInsightsContextStore } from 'san-studio/lib/Sidebar/Metrics/Insights/context';
import { useStore } from './stores';
import { loadInsights } from '../../ducks/Studio/insights/context';
import { getFollowingsCount, getMyInsights } from '../../ducks/Studio/insights/queries';
import ChartInsights from '../../ducks/Studio/Chart/Insights';
export const useInsightsStoreCreator = () => useMemo(newInsightsContextStore, []);

const immute = v => _extends({}, v);

const useInsightsContext = store => useStore(store, immute);

const Insights = ({
  InsightsStore,
  widget
}) => {
  const store = useInsightsContext(InsightsStore);
  const [insights, setInsights] = useState([]);
  const [, setErrorMsg] = useState({});
  const [wasUserInfoFetcher, setWasUserInfoFetcher] = useState(false);
  useEffect(() => {
    if (wasUserInfoFetcher) return;
    setWasUserInfoFetcher(true);
    getMyInsights().then(insights => InsightsStore.apply({
      hasMyInsights: !!insights.length
    }));
    getFollowingsCount().then(count => InsightsStore.apply({
      hasFollowings: !!count
    }));
  }, [!!store.insight]);
  useEffect(() => {
    const {
      insight,
      from,
      to
    } = store;
    if (!insight) return setInsights([]);
    let race = false;
    loadInsights(insight.key, from, to).then(insights => {
      if (race) return;
      setInsights(insights);
    }).catch(({
      message
    }) => {
      if (race) return;
      setErrorMsg(state => _objectSpread(_objectSpread({}, state), {}, {
        [insight.key]: message
      }));
      setInsights([]);
    });
    return () => race = true;
  }, [store]);
  const {
    chart
  } = widget;
  const target = chart && chart.canvas.parentNode;
  return target ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(ChartInsights, {
    chart: widget.chart,
    insights: insights
  }), target) : null;
};

export default Insights;
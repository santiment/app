function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart';
import { DEFAULT_INTERVAL_SELECTORS, INTERVAL_3_MONTHS } from '../../../components/DashboardMetricChart/utils';
import { Metric } from '../../dataHub/metrics';
import { GREEN, RED } from '../../Chart/colors';
const METRICS = [_objectSpread(_objectSpread({}, Metric.exchange_inflow), {}, {
  reqMeta: {
    market_segments: 'Stablecoin USD'
  },
  domainGroup: 'stablecoins'
}), _objectSpread(_objectSpread({}, Metric.exchange_outflow), {}, {
  reqMeta: {
    market_segments: 'Stablecoin USD'
  },
  domainGroup: 'stablecoins'
})];
const METRICS_COLOR = {
  [Metric.exchange_inflow.key]: GREEN,
  [Metric.exchange_outflow.key]: RED
};

const NetExchangeFlow = () => /*#__PURE__*/React.createElement(DashboardMetricChart, {
  metrics: METRICS,
  intervals: DEFAULT_INTERVAL_SELECTORS,
  metricsColor: METRICS_COLOR,
  defaultInterval: INTERVAL_3_MONTHS
});

export default NetExchangeFlow;
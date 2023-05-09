function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Metric } from '../../dataHub/metrics';
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart';
import { INTERVAL_30_DAYS } from '../../../components/DashboardMetricChart/utils';
const UNISWAP = 'uniswap';
export const SUPPORTED_METRICS = [_objectSpread(_objectSpread({}, Metric.price_usd), {}, {
  reqMeta: {
    slug: UNISWAP
  }
}), _objectSpread(_objectSpread({}, Metric.age_consumed), {}, {
  reqMeta: {
    slug: UNISWAP
  }
}), _objectSpread(_objectSpread({}, Metric.active_addresses_24h), {}, {
  reqMeta: {
    slug: UNISWAP
  }
})];

const UniMetricsChart = () => /*#__PURE__*/React.createElement(DashboardMetricChart, {
  metrics: SUPPORTED_METRICS,
  defaultInterval: INTERVAL_30_DAYS
});

export default UniMetricsChart;
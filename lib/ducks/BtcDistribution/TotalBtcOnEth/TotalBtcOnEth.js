function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../components/DashboardMetricChart/DashboardMetricChart';
import { INTERVAL_6_MONTHS, NON_DAILY_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils';
import { BTC_RELATED_ASSETS } from '../DistributionBtcOnEth/DistributionBtcOnEth';
import { Metric } from '../../dataHub/metrics';
const METRICS = [{
  key: `total_supply`,
  label: 'Total supply',
  node: 'area',
  reqMeta: {
    slugs: BTC_RELATED_ASSETS
  }
}, _objectSpread(_objectSpread({}, Metric.price_usd), {}, {
  label: 'Price ETH',
  reqMeta: {
    slug: 'ethereum',
    interval: '1d'
  }
})];

const TotalBtcOnEth = () => /*#__PURE__*/React.createElement(DashboardMetricChart, {
  metrics: METRICS,
  intervals: NON_DAILY_INTERVAL_SELECTORS,
  defaultInterval: INTERVAL_6_MONTHS
});

export default TotalBtcOnEth;
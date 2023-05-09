function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import UniswapMetric from './UniswapMetric';
import styles from './UniswapMetrics.module.css';
import { percentageFormatter } from '../../dataHub/metrics/formatters';
const UniswapMetricsList = [{
  human_readable_name: 'Total UNI claimed',
  name: 'uniswap_total_claims_amount',
  metric: 'uniswap_amount_claimed',
  version: '2019-12-22',
  access: 'restricted',
  selectors: ['slug'],
  min_plan: {
    SANAPI: 'pro',
    SANBASE: 'free'
  },
  aggregation: 'last',
  min_interval: '1h',
  table: 'intraday_metrics',
  has_incomplete_data: false,
  data_type: 'timeseries'
}, {
  human_readable_name: 'Total UNI claimed by historical users',
  name: 'uniswap_total_user_claims_amount',
  metric: 'uniswap_amount_user_claimed',
  version: '2019-12-22',
  access: 'restricted',
  selectors: ['slug'],
  min_plan: {
    SANAPI: 'pro',
    SANBASE: 'free'
  },
  aggregation: 'last',
  min_interval: '1h',
  table: 'intraday_metrics',
  has_incomplete_data: false,
  data_type: 'timeseries'
}, {
  human_readable_name: 'Total UNI claimed by liquidity providers',
  name: 'uniswap_total_lp_claims_amount',
  metric: 'uniswap_amount_lp_claimed',
  version: '2019-12-22',
  access: 'restricted',
  selectors: ['slug'],
  min_plan: {
    SANAPI: 'pro',
    SANBASE: 'free'
  },
  aggregation: 'last',
  min_interval: '1h',
  table: 'intraday_metrics',
  has_incomplete_data: false,
  data_type: 'timeseries'
}, {
  human_readable_name: 'Percent of UNI claimed',
  name: 'uniswap_total_claims_percent',
  metric: 'uniswap_percent_claimed',
  version: '2019-12-22',
  access: 'restricted',
  selectors: ['slug'],
  min_plan: {
    SANAPI: 'pro',
    SANBASE: 'free'
  },
  aggregation: 'last',
  min_interval: '5m',
  table: 'intraday_metrics',
  has_incomplete_data: false,
  data_type: 'timeseries',
  formatter: percentageFormatter
}];
const metrics = UniswapMetricsList.map(item => _objectSpread(_objectSpread({}, item), {}, {
  key: item.name
}));

const UniswapMetrics = () => /*#__PURE__*/React.createElement("div", {
  className: styles.container
}, metrics.map(m => {
  return /*#__PURE__*/React.createElement(UniswapMetric, {
    key: m.key,
    metric: m
  });
}));

export default UniswapMetrics;
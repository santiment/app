function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter';
import { percentageFormatter } from '../../dataHub/metrics/formatters';
import { BTC_RELATED_SELECTOR, BTC_SELECTOR, ETH_SELECTOR } from './utils';
import { AGGREGATION_TYPES, useMetric } from '../get_metric';

const PercentOfEthMarketcap = ({
  settings
}) => {
  const {
    data: totalData,
    loading: totalLoading
  } = useMetric(_objectSpread(_objectSpread({}, settings), {}, {
    selector: BTC_RELATED_SELECTOR,
    aggregation: AGGREGATION_TYPES.SUM
  }), 'total_supply');
  const {
    data: avgPriceData,
    loading: avgPriceLoading
  } = useMetric(_objectSpread(_objectSpread({}, settings), {}, {
    selector: BTC_SELECTOR,
    aggregation: AGGREGATION_TYPES.LAST
  }), 'daily_avg_price_usd');
  const {
    data: marketCapData,
    loading: marketCapLoading
  } = useMetric(_objectSpread(_objectSpread({}, settings), {}, {
    selector: ETH_SELECTOR,
    aggregation: AGGREGATION_TYPES.LAST
  }), 'daily_avg_marketcap_usd');
  const percent = 100 * avgPriceData * totalData / marketCapData;
  return /*#__PURE__*/React.createElement(DashboardCounter, {
    value: percent,
    loadings: totalLoading || marketCapLoading || avgPriceLoading,
    formatter: percentageFormatter,
    title: "Percent of Ethereum's Market Cap"
  });
};

export default PercentOfEthMarketcap;
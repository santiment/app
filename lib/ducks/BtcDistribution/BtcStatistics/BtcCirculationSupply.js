function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { AGGREGATION_TYPES, useMetric } from '../get_metric';
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter';
import { percentageFormatter } from '../../dataHub/metrics/formatters';
import { Metric } from '../../dataHub/metrics';
import { BTC_RELATED_SELECTOR, BTC_SELECTOR } from './utils';

const BtcCirculationSupply = ({
  settings
}) => {
  const {
    data: btcAssetsData,
    loading: totalLoading
  } = useMetric(_objectSpread(_objectSpread({}, settings), {}, {
    selector: BTC_RELATED_SELECTOR,
    aggregation: AGGREGATION_TYPES.SUM
  }), 'total_supply');
  const {
    data: totalData,
    loading: btcLoading
  } = useMetric(_objectSpread(_objectSpread({}, settings), {}, {
    selector: BTC_SELECTOR,
    aggregation: AGGREGATION_TYPES.MAX
  }), Metric.circulation.key);
  const percent = 100 * btcAssetsData / totalData;
  return /*#__PURE__*/React.createElement(DashboardCounter, {
    value: percent,
    formatter: percentageFormatter,
    loadings: btcLoading || totalLoading,
    title: "Percent of Bitcoin's Circulating Supply"
  });
};

export default BtcCirculationSupply;
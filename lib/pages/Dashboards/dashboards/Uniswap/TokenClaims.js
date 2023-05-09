import React from 'react';
import UniswapHistoricalBalance from '../../../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance';
import { ChartWidget } from '../../../../components/ClaimersWidgets';
import { Metric } from '../../../../ducks/dataHub/metrics';
import styles from './Uniswap.module.css';
const BALANCE_CHART_PADDING = {
  top: 16,
  right: 45,
  bottom: 18,
  left: 45
};
const BALANCE_CHART_TICKS = {
  xTicks: 6,
  yTicks: 6
};
const TOTAL_CLAIMS_METRICS = [Metric.uniswap_total_claims_amount, Metric.uniswap_total_claims_percent];
export default (() => /*#__PURE__*/React.createElement("div", {
  className: styles.overviewWrapper
}, /*#__PURE__*/React.createElement(UniswapHistoricalBalance, {
  className: styles.balance__chart,
  headerClassName: styles.balance__header,
  axesTicks: BALANCE_CHART_TICKS,
  padding: BALANCE_CHART_PADDING,
  height: 448
}), /*#__PURE__*/React.createElement(ChartWidget, {
  height: 448,
  metrics: TOTAL_CLAIMS_METRICS
})));
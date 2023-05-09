import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { getAmPm, getDateFormats, getTimeFormats, make12Hours } from '../../utils/dates';
import Skeleton from '../Skeleton/Skeleton';
import { millify } from '../../utils/formatting';
import { COLORS } from '../../ducks/Chart/colors';
import { sortBy } from '../../utils/sortMethods';
import ViewBalanceDialog from '../WalletLink/ViewBalanceDialog';
import { useEthPieChart } from '../../ducks/Eth2.0/utils';
import { DashboardIntervals } from '../DashboardMetricChart/DashboardChartHeader/DashboardChartHeaderWrapper';
import { ETH2_INTERVAL_SELECTORS, INTERVAL_30_DAYS } from '../DashboardMetricChart/utils';
import { useChartSettings } from '../DashboardMetricChart/DashboardMetricChart';
import styles from './DashPieChart.module.css';
const PIE_COLORS = COLORS;
const SORTER = sortBy('value');

const DashPieChart = ({
  query,
  metric,
  defaultInterval = INTERVAL_30_DAYS,
  intervals = ETH2_INTERVAL_SELECTORS
}) => {
  const currDate = new Date();
  const {
    MMM,
    D
  } = getDateFormats(currDate);
  const {
    H,
    mm
  } = getTimeFormats(currDate);
  const {
    intervalSelector,
    onChangeInterval,
    settings
  } = useChartSettings(defaultInterval, metric);
  const {
    data: chartData,
    loading
  } = useEthPieChart(query, settings);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DashboardIntervals, {
    interval: intervalSelector,
    setInterval: onChangeInterval,
    intervals: intervals
  }), /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    className: styles.skeleton,
    show: loading
  }), !loading && /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(PieChart, {
    width: 400,
    height: 300
  }, /*#__PURE__*/React.createElement(Pie, {
    data: chartData,
    cx: 200,
    cy: 140,
    labelLine: false,
    outerRadius: 140,
    dataKey: 'value',
    valueKey: 'value'
  }, chartData.map(({
    color
  }, idx) => /*#__PURE__*/React.createElement(Cell, {
    fill: PIE_COLORS[idx],
    key: idx
  })))), /*#__PURE__*/React.createElement("p", {
    className: styles.time
  }, `Last update: ${D} ${MMM}, ${make12Hours(H)}:${mm}${getAmPm(H)}`)), /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, /*#__PURE__*/React.createElement("ul", {
    className: styles.list
  }, chartData.sort(SORTER).map(({
    label,
    value,
    address,
    color
  }, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: styles.item,
    style: {
      '--pie-chart-item-color': PIE_COLORS[idx]
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.item__name
  }, label, ":"), /*#__PURE__*/React.createElement("span", {
    className: styles.item__value
  }, millify(value)), address && /*#__PURE__*/React.createElement(ViewBalanceDialog, {
    assets: ['ethereum'],
    address: address,
    trigger: /*#__PURE__*/React.createElement("span", {
      className: styles.item__address
    }, "(", address, ")")
  })))))));
};

export default DashPieChart;
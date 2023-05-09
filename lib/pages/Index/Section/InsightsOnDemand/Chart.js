import React from 'react';
import { useAxesMetricsKey } from '../../../../ducks/Chart/hooks';
import Canvas from '../../../../ducks/Chart/Modular';
import Areas from '../../../../ducks/Chart/Areas';
import Lines from '../../../../ducks/Chart/Lines';
import Bars from '../../../../ducks/Chart/Bars';
import Tooltip from '../../../../ducks/Chart/Tooltip';
import { useMetricCategories } from '../../../../ducks/Chart/Synchronizer';
import { useChartColors } from '../../../../ducks/Chart/colors';
import { useTimeseries } from '../../../../ducks/Studio/timeseries/hooks';
import styles from './index.module.css';
const PADDING = {
  left: 3,
  right: 3,
  top: 20,
  bottom: 3
};

const Chart = ({
  metrics,
  settings,
  MetricColor
}) => {
  const [data] = useTimeseries(metrics, settings);
  const categories = useMetricCategories(metrics);
  const colors = useChartColors(metrics, MetricColor);
  const axesMetricKeys = useAxesMetricsKey(metrics);
  return /*#__PURE__*/React.createElement(Canvas, {
    className: styles.chart,
    padding: PADDING,
    height: 176,
    data: data,
    colors: colors,
    categories: categories
  }, /*#__PURE__*/React.createElement(Bars, null), /*#__PURE__*/React.createElement(Areas, null), /*#__PURE__*/React.createElement(Lines, null), /*#__PURE__*/React.createElement(Tooltip, {
    metric: axesMetricKeys[0],
    axesMetricKeys: axesMetricKeys
  }));
};

export default Chart;
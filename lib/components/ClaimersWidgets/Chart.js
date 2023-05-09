const _excluded = ["className", "metrics", "height"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import { linearScale } from '@santiment-network/chart/scales';
import { toEndOfDay } from '../../utils/dates';
import Chart from '../../ducks/Chart';
import { useMetricCategories } from '../../ducks/Chart/Synchronizer';
import { useAxesMetricsKey } from '../../ducks/Chart/hooks';
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks';
import styles from './index.module.css';
const settings = {
  slug: 'uniswap',
  interval: '12h',
  from: '2020-09-16T00:00:00Z',
  to: toEndOfDay(new Date()).toISOString()
};
const chartPadding = {
  top: 16,
  right: 45,
  bottom: 20,
  left: 8
};

const UniswapChart = _ref => {
  let {
    className,
    metrics,
    height
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const metric = metrics[0];
  const [data] = useTimeseries(metrics, settings);
  const categories = useMetricCategories(metrics);
  const axesMetricKeys = useAxesMetricsKey(metrics);
  const MetricColor = useMemo(() => ({
    [metric.key]: metric.color
  }), metrics);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.widget, styles.chart)
  }, /*#__PURE__*/React.createElement(Chart, _extends({}, props, categories, settings, {
    hideBrush: true,
    hideWatermark: true,
    isCartesianGridActive: true,
    data: data,
    MetricColor: MetricColor,
    metrics: metrics,
    scale: linearScale,
    tooltipKey: axesMetricKeys[0],
    axesMetricKeys: axesMetricKeys,
    chartPadding: chartPadding,
    chartHeight: height,
    xAxesTicks: 5,
    yAxesTicks: 6,
    resizeDependencies: []
  })));
};

UniswapChart.defaultProps = {
  height: 270
};
export default UniswapChart;
const _excluded = ["metrics", "isLoading", "brushData", "onBrushChangeEnd", "settings", "axesMetricKeys", "options", "canvasSettings"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import withSizes from 'react-sizes';
import { linearScale, logScale } from '@santiment-network/chart/scales';
import { useMetricCategories } from '../../ducks/Chart/Synchronizer';
import { useAxesMetricsKey, useClosestValueData, useEdgeGaps } from '../../ducks/Chart/hooks';
import { mapSizesToProps } from '../../utils/withSizes';
import SANChart from '../../ducks/Chart/Modular';
import Areas from '../../ducks/Chart/Areas';
import Lines from '../../ducks/Chart/Lines';
import CartesianGrid from '../../ducks/Chart/CartesianGrid';
import Axes from '../../ducks/Chart/Axes';
import Tooltip from '../../ducks/Chart/Tooltip';
import Bars from '../../ducks/Chart/Bars';
import Brush from '../../ducks/Chart/Brush';
import Watermark from '../../ducks/Chart/Watermark';
import styles from './DashboardMetricChartWrapper.module.css';
const CHART_PADDING_DESKTOP = {
  top: 16,
  right: 40,
  bottom: 73,
  left: 0
};
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const DashboardMetricChartWrapper = ({
  settings,
  data: rawData,
  metrics,
  isDesktop,
  MetricColor,
  isDomainGroupingActive,
  loadings,
  onBrushChangeEnd,
  allTimeData,
  domainGroups,
  axesMetricKeysDefault,
  mirrorDomainGroups,
  sliceMetricsCount = 1,
  chartRef,
  options,
  canvasSettings
}) => {
  const categories = useMetricCategories(metrics);
  const axesMetricKeys = axesMetricKeysDefault || useAxesMetricsKey(metrics, isDomainGroupingActive).slice(0, sliceMetricsCount);
  const data = useEdgeGaps(useClosestValueData(rawData, metrics, options.isClosestDataActive));
  return /*#__PURE__*/React.createElement(Canvas, {
    className: styles.chart,
    settings: settings,
    categories: categories,
    chartRef: chartRef,
    data: data,
    brushData: allTimeData,
    onBrushChangeEnd: onBrushChangeEnd,
    metrics: metrics,
    padding: isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE,
    resizeDependencies: [],
    colors: MetricColor,
    tooltipKey: axesMetricKeys[0],
    axesMetricKeys: axesMetricKeys,
    domainGroups: isDomainGroupingActive ? domainGroups : mirrorDomainGroups,
    isLoading: loadings.length > 0,
    scale: options.isLogScale ? logScale : linearScale,
    options: options,
    canvasSettings: canvasSettings
  });
};

const DEFAULT_CANVAS_SETTING = {
  height: 400
};

const Canvas = _ref => {
  let {
    metrics,
    isLoading,
    brushData,
    onBrushChangeEnd,
    settings,
    axesMetricKeys,
    options,
    canvasSettings: {
      height
    } = DEFAULT_CANVAS_SETTING
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    from,
    to
  } = settings;
  const {
    isWatermarkVisible,
    isWatermarkLighter,
    isCartesianGridActive
  } = options;
  return /*#__PURE__*/React.createElement(SANChart, _extends({
    height: height
  }, props), isWatermarkVisible && /*#__PURE__*/React.createElement(Watermark, {
    light: isWatermarkLighter
  }), /*#__PURE__*/React.createElement(Areas, null), /*#__PURE__*/React.createElement(Bars, null), /*#__PURE__*/React.createElement(Lines, null), isCartesianGridActive && /*#__PURE__*/React.createElement(CartesianGrid, null), /*#__PURE__*/React.createElement(Axes, {
    metrics: axesMetricKeys
  }), /*#__PURE__*/React.createElement(Tooltip, {
    metric: axesMetricKeys[0]
  }), /*#__PURE__*/React.createElement(Brush, _extends({}, props, {
    data: brushData,
    from: from,
    to: to,
    onChangeEnd: onBrushChangeEnd
  })));
};

export default withSizes(mapSizesToProps)(DashboardMetricChartWrapper);
const _excluded = ["metrics", "settings", "axesTicks"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import Loader from '@santiment-network/ui/Loader/Loader';
import SANChart from '../../Chart/Modular';
import Lines from '../../Chart/Lines';
import Areas from '../../Chart/Areas';
import Axes from '../../Chart/Axes';
import CartesianGrid from '../../Chart/CartesianGrid';
import Tooltip from '../../Chart/Tooltip';
import { useChartColors } from '../../Chart/colors';
import { useClosestValueData, useAxesMetricsKey } from '../../Chart/hooks';
import { useMetricCategories } from '../../Chart/Synchronizer';
import { useTimeseries } from '../../Studio/timeseries/hooks';
import styles from './Canvas.module.css';
const CHART_PADDING = {
  top: 25,
  bottom: 25,
  right: 48,
  left: 15
};

const DOUBLE_AXIS_PADDING = _objectSpread(_objectSpread({}, CHART_PADDING), {}, {
  left: 48
});

function getResponsiveTicks(isPhone) {
  let xTicks;
  let yTicks;

  if (isPhone) {
    xTicks = 4;
    yTicks = 6;
  }

  return {
    xTicks,
    yTicks
  };
}

export const useResponsiveTicks = isPhone => useMemo(() => getResponsiveTicks(isPhone), [isPhone]);

const Canvas = _ref => {
  let {
    metrics,
    settings,
    axesTicks
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [rawData, loadings] = useTimeseries(metrics, settings);
  const data = useClosestValueData(rawData, metrics);
  const categories = useMetricCategories(metrics);
  const MetricColor = useChartColors(metrics);
  const axesMetricKeys = useAxesMetricsKey(metrics);
  return /*#__PURE__*/React.createElement(SANChart, _extends({
    padding: axesMetricKeys[1] ? DOUBLE_AXIS_PADDING : CHART_PADDING
  }, props, {
    data: data,
    categories: categories,
    colors: MetricColor
  }), /*#__PURE__*/React.createElement(Areas, null), /*#__PURE__*/React.createElement(Lines, null), /*#__PURE__*/React.createElement(CartesianGrid, axesTicks), /*#__PURE__*/React.createElement(Axes, _extends({
    metrics: axesMetricKeys
  }, axesTicks)), /*#__PURE__*/React.createElement(Tooltip, {
    metric: axesMetricKeys[0]
  }), loadings.length > 0 && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }), metrics.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Please paste the wallet address and choose supported assets in the forms above to see the historical data"));
};

export default Canvas;
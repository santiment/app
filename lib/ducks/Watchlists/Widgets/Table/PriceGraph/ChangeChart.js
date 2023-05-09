const _excluded = ["data", "dataKey", "color"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Area, AreaChart, Tooltip } from 'recharts';
import Gradients from '../../../../../components/Gradients';
import { calcPercentageChange } from '../../../../../utils/utils';
import ChartTooltip from '../../../../SANCharts/tooltip/CommonChartTooltip';
import { tooltipLabelFormatter } from '../../../../dataHub/metrics/formatters';

const labelFormatter = (label, payload) => {
  if (!payload[0]) {
    return;
  }

  return tooltipLabelFormatter(payload[0].payload.datetime);
};

export const useAreaData = (stats, key = 'value') => {
  const {
    [key]: latestValue
  } = stats.slice(-1)[0] || {};
  const {
    [key]: value
  } = stats.slice(0, 1)[0] || {};
  const change = value ? calcPercentageChange(value, latestValue) : 0;
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`;
  const minValue = Math.min(...stats.map(({
    [key]: value
  }) => value));
  const chartStats = stats.map(stat => _objectSpread(_objectSpread({}, stat), {}, {
    originalValue: stat[key],
    [key]: stat[key] - minValue
  }));
  return {
    change,
    chartStats,
    color,
    value,
    latestValue
  };
};

const ChangeChart = _ref => {
  let {
    data,
    dataKey = 'value',
    color: forceColor
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const area = useAreaData(data, dataKey);
  return /*#__PURE__*/React.createElement(ChangeChartTemplate, _extends({}, area, {
    dataKey: dataKey,
    forceColor: forceColor
  }, rest));
};

export const ChangeChartTemplate = ({
  chartStats,
  latestValue,
  color,
  value,
  width,
  height = 45,
  showTooltip,
  dataKey = 'value',
  forceColor,
  valueFormatter
}) => /*#__PURE__*/React.createElement(AreaChart, {
  data: chartStats,
  height: height,
  width: width
}, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement(Gradients, {
  downColor: forceColor,
  upColor: forceColor
})), /*#__PURE__*/React.createElement(Area, {
  dataKey: dataKey,
  type: "monotone",
  strokeWidth: 1.5,
  stroke: forceColor || color,
  fill: `url(#total${latestValue >= value ? 'Up' : 'Down'})`,
  isAnimationActive: false
}), showTooltip && /*#__PURE__*/React.createElement(Tooltip, {
  content: /*#__PURE__*/React.createElement(ChartTooltip, {
    name: "ROI",
    labelFormatter: labelFormatter,
    valueFormatter: valueFormatter
  }),
  cursor: false,
  dataKey: dataKey,
  isAnimationActive: false
}));
export default ChangeChart;
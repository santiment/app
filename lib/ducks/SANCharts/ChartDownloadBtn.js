const _excluded = ["brushPaintConfig"],
      _excluded2 = ["chartRef", "metrics", "title", "data", "MetricNode"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import { initChart, updateChartState } from '@santiment-network/chart';
import { paintConfigs } from '../Chart/paintConfigs';
import { metricsToPlotCategories } from '../Chart/Synchronizer';
import { domainModifier } from '../Chart/domain';
import { getMultiAxesChartPadding } from '../Studio/Chart/Canvas';
import { getDateFormats, getTimeFormats } from '../../utils/dates';
import { useTheme } from '../../stores/ui/theme';
const {
  mirage
} = {};
const CHART_PADDING = {
  top: 10,
  left: 65,
  right: 65,
  bottom: 75
};
const LEGEND_RECT_SIZE = 9;
const LEGEND_RECT_RIGHT_MARGIN = 5;
const TEXT_RIGHT_MARGIN = 20;
const LEGEND_FONT = '15px Proxima Nova';
const PNG_WIDTH = 1920;
const PNG_HEIGHT = 650;

function drawAndMeasureText(pngCtx, text, x, y) {
  pngCtx.fillText(text, x, y);
  return pngCtx.measureText(text).width;
}

function drawLegend(pngChart, metrics, isNightMode) {
  const {
    canvasWidth: width,
    canvasHeight: height,
    colors
  } = pngChart;
  const pngCtx = pngChart.ctx;
  pngCtx.font = LEGEND_FONT;
  const textWidth = metrics.reduce((acc, {
    label
  }) => acc + LEGEND_RECT_SIZE + LEGEND_RECT_RIGHT_MARGIN + pngCtx.measureText(label).width, 0) + TEXT_RIGHT_MARGIN * (metrics.length - 1);
  const textY = height - 20;
  let textX = (width - textWidth) / 2;
  const textColor = isNightMode ? 'white' : mirage;
  metrics.forEach(({
    key,
    label
  }) => {
    pngCtx.fillStyle = colors[key];
    pngCtx.fillRect(textX, textY - LEGEND_RECT_SIZE, LEGEND_RECT_SIZE, LEGEND_RECT_SIZE);
    pngCtx.fillStyle = textColor;
    textX += LEGEND_RECT_SIZE + LEGEND_RECT_RIGHT_MARGIN;
    textX += drawAndMeasureText(pngCtx, label, textX, textY) + TEXT_RIGHT_MARGIN;
  });
}

function downloadChart({
  current: chart
}, title, metrics, data, MetricNode, isNightMode) {
  const {
    scale,
    colors,
    domainGroups,
    plotter,
    axesMetricKeys
  } = chart;

  const _paintConfigs$isNight = paintConfigs[+isNightMode],
        {
    brushPaintConfig
  } = _paintConfigs$isNight,
        rest = _objectWithoutProperties(_paintConfigs$isNight, _excluded);

  const categories = metricsToPlotCategories(metrics, MetricNode);
  const {
    joinedCategories
  } = categories;
  const dpr = window.devicePixelRatio || 1;
  window.devicePixelRatio = 2;
  const pngCanvas = document.createElement('canvas');
  const pngChart = initChart(pngCanvas, PNG_WIDTH, PNG_HEIGHT, chart.isMultiAxes ? getMultiAxesChartPadding(axesMetricKeys) : CHART_PADDING);
  window.devicePixelRatio = dpr;

  _extends(pngChart, rest);

  pngChart.axesMetricKeys = axesMetricKeys;
  pngChart.domainGroups = domainGroups;
  pngChart.colors = chart.colors;
  pngChart.ticksPaintConfig = _objectSpread(_objectSpread({}, pngChart.ticksPaintConfig), {}, {
    font: '14px Proxima Nova'
  });
  updateChartState(pngChart, data, joinedCategories, domainModifier, domainGroups, new Set(categories.candles));
  plotter.items.forEach(plot => {
    plot(pngChart, scale, data, colors, categories);
  });
  drawLegend(pngChart, metrics, isNightMode);
  pngChart.ctx.globalCompositeOperation = 'destination-over';
  pngChart.ctx.fillStyle = isNightMode ? mirage : 'white';
  pngChart.ctx.fillRect(0, 0, PNG_WIDTH, PNG_HEIGHT);
  const a = document.createElement('a');
  const date = new Date();
  const {
    DD,
    MMM,
    YYYY
  } = getDateFormats(date);
  const {
    HH,
    mm,
    ss
  } = getTimeFormats(date);
  a.download = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].png`;
  a.href = pngCanvas.toDataURL('image/png', 1);
  a.click();
  a.remove();
  pngCanvas.remove();
}

const ChartDownloadBtn = _ref => {
  let {
    chartRef,
    metrics,
    title = 'Chart',
    data,
    MetricNode
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded2);

  const {
    isNightMode
  } = useTheme();
  return /*#__PURE__*/React.createElement(Button, _extends({}, props, {
    onClick: () => {
      try {
        downloadChart(chartRef, title, metrics, data, MetricNode, isNightMode);
      } catch (e) {
        console.error(e);
        alert("Can't download this chart");
      }
    }
  }));
};

export default ChartDownloadBtn;
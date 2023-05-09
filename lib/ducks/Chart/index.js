const _excluded = ["brushPaintConfig"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { initChart, updateChartState } from '@santiment-network/chart';
import { initTooltip } from '@santiment-network/chart/tooltip';
import { plotLines, plotFilledLines, plotGradientLine } from '@santiment-network/chart/lines';
import { plotAreas } from '@santiment-network/chart/areas';
import { plotAutoWidthBars, plotBars } from '@santiment-network/chart/bars';
import { plotGreenRedBars } from '@santiment-network/chart/bars/greenRedBars';
import { linearScale } from '@santiment-network/chart/scales';
import { drawReferenceDot } from '@santiment-network/chart/references';
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid';
import { initBrush, updateBrushState } from '@santiment-network/chart/brush';
import Loader from './Loader/Loader';
import { BRUSH_HEIGHT, CHART_PADDING, BRUSH_PADDING, DOUBLE_AXIS_PADDING, buildPadding } from './settings';
import { ResizeListener, onResize } from './resize';
import { clearCtx } from './utils';
import { domainModifier } from './domain';
import { paintConfigs, dayBrushPaintConfig } from './paintConfigs';
import { plotAxes } from './Axes/helpers';
import { setupTooltip, plotTooltip } from './Tooltip/legacy';
import { drawWatermark } from './Watermark/helpers';
import { useTheme } from '../../stores/ui/theme';
import styles from './index.module.css';

const Chart = ({
  className,
  chartRef,
  data,
  brushData = data,
  lines,
  areas,
  filledLines,
  gradientLines,
  bars,
  autoWidthBars,
  greenRedBars,
  chartHeight,
  chartPadding = CHART_PADDING,
  joinedCategories,
  domainGroups,
  events,
  scale = linearScale,
  tooltipKey,
  axesMetricKeys,
  MetricColor,
  from,
  to,
  hideBrush,
  hideAxes,
  hideWatermark,
  onPlotTooltip,
  useCustomTooltip,
  isLoading,
  isCartesianGridActive,
  isWatermarkLighter,
  syncTooltips,
  onRangeSelect,
  onRangeSelectStart,
  onPointClick,
  resizeDependencies,
  onBrushChangeEnd,
  children,
  xAxesTicks,
  yAxesTicks
}) => {
  const {
    isNightMode
  } = useTheme();
  let [chart, setChart] = useState();
  let [brush, setBrush] = useState();
  const canvasRef = useRef();
  const isShowBrush = !hideBrush;
  useEffect(() => {
    const {
      current: canvas
    } = canvasRef;
    const width = canvas.parentNode.offsetWidth;
    const height = chartHeight || canvas.parentNode.offsetHeight;
    chart = initTooltip(initChart(canvas, width, height, buildPadding(chartPadding, isShowBrush && BRUSH_PADDING, axesMetricKeys[1] && DOUBLE_AXIS_PADDING)));
    chart.tooltipKey = tooltipKey;

    if (isShowBrush) {
      brush = initBrush(chart, width, BRUSH_HEIGHT, dayBrushPaintConfig, plotBrushData, undefined, onBrushChangeEnd);
      brush.canvas.classList.add(styles.brush);
      setBrush(brush);
    }

    setChart(chart);

    if (chartRef) {
      chartRef.current = chart;
    }

    setupTooltip(chart, marker, useCustomTooltip, onPlotTooltip);
  }, []);

  if (brush) {
    // NOTE: Because func.component works with closures, captured values might be outdated [@vanguard | Jan 23, 2020]
    brush.plotBrushData = plotBrushData;
    brush.onChangeEnd = onBrushChangeEnd;
  }

  useEffect(() => {
    const _paintConfigs = paintConfigs[isNightMode ? +isNightMode : 0],
          {
      brushPaintConfig
    } = _paintConfigs,
          rest = _objectWithoutProperties(_paintConfigs, _excluded);

    _extends(chart, rest);

    if (brush) {
      brush.paintConfig = brushPaintConfig;
    }
  }, [isNightMode]);

  if (chart) {
    chart.onRangeSelect = onRangeSelect;
    chart.onRangeSelectStart = onRangeSelectStart;
    chart.onPointClick = onPointClick;
    chart.tooltipKey = tooltipKey;
    chart.axesMetricKeys = axesMetricKeys;
    chart.colors = MetricColor;
    chart.scale = scale;
    chart.domainModifier = domainModifier;
    chart.domainGroups = domainGroups;
    chart.isCartesianGridActive = isCartesianGridActive;
    chart.isWatermarkLighter = isWatermarkLighter;
    chart.hideWatermark = hideWatermark;
    chart.isWatermarkVisible = !hideWatermark;
    chart.syncTooltips = syncTooltips;

    chart.drawTooltip = point => plotTooltip(chart, marker, point);

    chart.xAxesTicks = xAxesTicks;
    chart.yAxesTicks = yAxesTicks;
  }

  useEffect(() => {
    const {
      length
    } = brushData;

    if (brush && length) {
      let {
        startIndex = 0,
        endIndex = length - 1
      } = brush;
      const [{
        datetime: startTimestamp
      }] = brushData;
      const {
        datetime: endTimestamp
      } = brushData[length - 1];
      const fromTimestamp = +new Date(from);
      const toTimestamp = +new Date(to);
      const scale = length / (endTimestamp - startTimestamp);

      if (!brushData[startIndex] || fromTimestamp !== brushData[startIndex].datetime) {
        startIndex = Math.trunc(scale * (fromTimestamp - startTimestamp));
      }

      if (!brushData[endIndex] || toTimestamp !== brushData[endIndex].datetime) {
        endIndex = Math.trunc(scale * (toTimestamp - startTimestamp));
      }

      startIndex = startIndex > 0 ? startIndex < length ? startIndex : length - 1 : 0;
      endIndex = endIndex > 0 ? endIndex < length ? endIndex : length - 1 : 0;

      if (endIndex - startIndex < 2) {
        if (startIndex > 2) {
          startIndex -= 2;
        } else {
          endIndex += 2;
        }
      }

      brush.startIndex = startIndex;
      brush.endIndex = endIndex;
      clearCtx(brush);
      updateBrushState(brush, brushData, joinedCategories);
    }
  }, [brushData, from, to]);
  useEffect(() => {
    if (joinedCategories.length === 0) {
      clearCtx(chart);
      return;
    }

    if (data.length === 0) return;
    clearCtx(chart);
    updateChartState(chart, data, joinedCategories, domainModifier, domainGroups);
    plotChart(data);

    if (!hideAxes) {
      plotAxes(chart, scale);
    }
  }, [data, scale, events, domainGroups, MetricColor, isNightMode, isCartesianGridActive, isWatermarkLighter, hideWatermark]);
  useEffect(() => {
    if (brush && brushData.length) {
      clearCtx(brush);
      updateBrushState(brush, brushData, joinedCategories);
    }
  }, [brushData, scale, domainGroups, isNightMode]);
  useEffect(handleResize, [...resizeDependencies, data]);

  function handleResize() {
    if (data.length === 0 || !chart) {
      return;
    }

    const padding = buildPadding(chartPadding, isShowBrush && BRUSH_PADDING, axesMetricKeys[1] && DOUBLE_AXIS_PADDING);
    onResize(chart, padding, brush, brushData, joinedCategories);
    updateChartState(chart, data, joinedCategories, domainModifier, domainGroups);
    plotChart(data);

    if (!hideAxes) {
      plotAxes(chart, scale);
    }
  }

  function plotBrushData() {
    plotAutoWidthBars(brush, brushData, autoWidthBars, scale, MetricColor);
    plotGreenRedBars(brush, brushData, greenRedBars[0], scale);
    plotBars(brush, brushData, bars, scale, MetricColor);
    plotLines(brush, brushData, lines, scale, MetricColor);
    plotFilledLines(brush, brushData, filledLines, scale, MetricColor);
    plotGradientLine(brush, brushData, gradientLines, scale, MetricColor);
  }

  function plotChart(data) {
    if (!hideWatermark) {
      drawWatermark(chart, isNightMode, isWatermarkLighter);
    }

    plotAutoWidthBars(chart, data, autoWidthBars, scale, MetricColor);
    plotGreenRedBars(chart, data, greenRedBars[0], scale);
    plotBars(chart, data, bars, scale, MetricColor);
    chart.ctx.lineWidth = 1.5;
    plotAreas(chart, data, areas, scale, MetricColor, MetricColor);
    plotFilledLines(chart, data, filledLines, scale, MetricColor);
    plotGradientLine(chart, data, gradientLines, scale, MetricColor);
    plotLines(chart, data, lines, scale, MetricColor);

    if (isCartesianGridActive) {
      drawCartesianGrid(chart, chart.axesColor, xAxesTicks || 10, yAxesTicks || 8);
    }

    events.forEach(({
      metric,
      key,
      datetime,
      value,
      color
    }) => drawReferenceDot(chart, metric, datetime, color, key, value));
  }

  function marker(ctx, key, value, x, y) {
    const {
      colors
    } = chart;
    ctx.fillStyle = colors[key];
    ctx.fillRect(x, y, 8, 2);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(ResizeListener, {
    onResize: handleResize
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef
  }), isLoading && /*#__PURE__*/React.createElement(Loader, null), chart && React.Children.map(children, child => child && /*#__PURE__*/React.cloneElement(child, {
    chart,
    scale,
    data
  })));
};

Chart.defaultProps = {
  events: [],
  axesMetricKeys: [],
  syncTooltips: () => {},
  onPointClick: () => {},
  lines: [],
  filledLines: [],
  gradientLines: [],
  bars: [],
  autoWidthBars: [],
  greenRedBars: [],
  joinedCategories: [],
  resizeDependencies: []
};
export default Chart;
const _excluded = ["widget", "data", "brushData", "metrics", "ErrorMsg", "settings", "options", "cursorType", "drawings", "selectedLineState", "isDrawingState", "isNewDrawingState", "isDomainGroupingActive", "isICOPriceActive", "isSelectingRange", "isFullscreen", "syncTooltips", "onBrushChangeEnd", "onPointMouseUp", "onRangeSelected", "onRangeSelecting", "setIsICOPriceDisabled"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import Insights from './Insights';
import IcoPrice from './IcoPrice';
import LastDayPrice from './LastDayPrice';
import ResponsiveChart from '../../Chart/Responsive';
import Areas from '../../Chart/Areas';
import Lines from '../../Chart/Lines';
import Candles from '../../Chart/Candles';
import Bars from '../../Chart/Bars';
import GreenRedBars from '../../Chart/GreenRedBars';
import Tooltip from '../../Chart/Tooltip';
import Drawer from '../../Chart/Drawer';
import Axes from '../../Chart/MultiAxes';
import CartesianGrid from '../../Chart/CartesianGrid';
import { useMultiAxesMetricKeys } from '../../Chart/hooks';
import Watermark from '../../Chart/Watermark';
import Brush from '../../Chart/Brush';
import Signals from '../../Chart/Signals';
import styles from './index.module.css';
const PADDING = {
  top: 10,
  bottom: 73,
  left: 5
};
export const getMultiAxesChartPadding = (axesMetricKeys, axesOffset = 50) => _extends({
  right: axesMetricKeys.length * axesOffset
}, PADDING);

const useChartPadding = axesMetricKeys => useMemo(() => getMultiAxesChartPadding(axesMetricKeys), [axesMetricKeys]);

const Canvas = _ref => {
  let {
    widget,
    data,
    brushData,
    metrics,
    ErrorMsg,
    settings,
    options,
    cursorType,
    drawings,
    selectedLineState,
    isDrawingState,
    isNewDrawingState,
    isDomainGroupingActive,
    isICOPriceActive,
    isSelectingRange,
    isFullscreen,
    syncTooltips,
    onBrushChangeEnd,
    onPointMouseUp,
    onRangeSelected,
    onRangeSelecting,
    setIsICOPriceDisabled
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const axesMetricKeys = useMultiAxesMetricKeys(widget, metrics, ErrorMsg, props.domainGroups);
  const padding = useChartPadding(axesMetricKeys);
  const isDrawing = isDrawingState[0];
  const {
    from,
    to
  } = settings;
  const {
    isCartesianGridActive,
    isWatermarkLighter,
    isWatermarkVisible
  } = options;
  return /*#__PURE__*/React.createElement(ResponsiveChart, _extends({
    padding: padding
  }, props, {
    data: data
  }), isWatermarkVisible && /*#__PURE__*/React.createElement(Watermark, {
    light: isWatermarkLighter
  }), /*#__PURE__*/React.createElement(GreenRedBars, null), /*#__PURE__*/React.createElement(Bars, null), /*#__PURE__*/React.createElement(Areas, null), /*#__PURE__*/React.createElement(Candles, {
    isFullscreen: isFullscreen
  }), /*#__PURE__*/React.createElement(Lines, null), /*#__PURE__*/React.createElement(Axes, {
    metrics: axesMetricKeys
  }), isCartesianGridActive && /*#__PURE__*/React.createElement(CartesianGrid, null), /*#__PURE__*/React.createElement(Drawer, {
    metricKey: axesMetricKeys[0],
    data: data,
    drawings: drawings,
    selectedLineState: selectedLineState,
    isDrawingState: isDrawingState,
    isNewDrawingState: isNewDrawingState
  }), /*#__PURE__*/React.createElement(Tooltip, {
    metric: axesMetricKeys[0],
    syncTooltips: syncTooltips,
    cursorType: cursorType,
    onPointMouseUp: onPointMouseUp,
    onRangeSelected: onRangeSelected,
    onRangeSelecting: onRangeSelecting
  }), /*#__PURE__*/React.createElement(Brush, _extends({}, props, {
    data: brushData,
    from: from,
    to: to,
    onChangeEnd: onBrushChangeEnd
  })), /*#__PURE__*/React.createElement(Insights, null), /*#__PURE__*/React.createElement(IcoPrice, _extends({}, settings, {
    isICOPriceActive: isICOPriceActive,
    metrics: metrics,
    className: styles.ico,
    onResult: price => setIsICOPriceDisabled(!price)
  })), /*#__PURE__*/React.createElement(LastDayPrice, {
    data: data,
    from: from,
    to: to
  }), isNewDrawingState[0] || isDrawing || isSelectingRange || /*#__PURE__*/React.createElement(Signals, _extends({}, settings, {
    metrics: metrics,
    data: data
  })));
};

Canvas.defaultProps = {
  domainGroups: [],
  ErrorMsg: {}
};
export default Canvas;
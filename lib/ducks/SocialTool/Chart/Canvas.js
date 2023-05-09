const _excluded = ["metrics", "options", "children"],
      _excluded2 = ["data", "brushData", "onBrushChangeEnd"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Chart from '../../Chart/Responsive';
import Lines from '../../Chart/Lines';
import Bars from '../../Chart/Bars';
import Tooltip from '../../Chart/Tooltip';
import Axes from '../../Chart/Axes';
import CartesianGrid from '../../Chart/CartesianGrid';
import { useAxesMetricsKey } from '../../Chart/hooks';
import Watermark from '../../Chart/Watermark';
import Brush from '../../Chart/Brush';
import Signals from '../../Chart/Signals';
const BASE_PADDING = {
  top: 10,
  right: 45,
  bottom: 23,
  left: 45
};

const PADDING = _objectSpread(_objectSpread({}, BASE_PADDING), {}, {
  bottom: 73
});

export const CanvasBase = _ref => {
  let {
    metrics,
    options,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const axesMetricKeys = useAxesMetricsKey(metrics);
  const {
    isCartesianGridActive,
    isWatermarkLighter,
    isWatermarkVisible
  } = options;
  return /*#__PURE__*/React.createElement(Chart, props, isWatermarkVisible && /*#__PURE__*/React.createElement(Watermark, {
    light: isWatermarkLighter
  }), /*#__PURE__*/React.createElement(Bars, null), /*#__PURE__*/React.createElement(Lines, null), /*#__PURE__*/React.createElement(Axes, {
    metrics: axesMetricKeys
  }), isCartesianGridActive && /*#__PURE__*/React.createElement(CartesianGrid, null), /*#__PURE__*/React.createElement(Tooltip, {
    metric: axesMetricKeys[0]
  }), children);
};
CanvasBase.defaultProps = {
  height: 270,
  padding: BASE_PADDING
};

const Canvas = _ref2 => {
  let {
    data,
    brushData,
    onBrushChangeEnd
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    settings,
    metrics
  } = props;
  const {
    from,
    to
  } = settings;
  return /*#__PURE__*/React.createElement(CanvasBase, _extends({
    data: data
  }, props), /*#__PURE__*/React.createElement(Brush, _extends({}, props, {
    data: brushData,
    from: from,
    to: to,
    onChangeEnd: onBrushChangeEnd
  })), /*#__PURE__*/React.createElement(Signals, _extends({}, settings, {
    metrics: metrics,
    data: data,
    selector: "text"
  })));
};

Canvas.defaultProps = {
  height: 420,
  padding: PADDING
};
export default Canvas;
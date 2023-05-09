const _excluded = ["MetricNode", "setOptions", "onDeleteChartClick"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import ChartSettingsContextMenu, { Icon } from '../../SANCharts/ChartSettingsContextMenu';
import ChartDownloadBtn from '../../SANCharts/ChartDownloadBtn';
import { saveToggle } from '../../../utils/localStorage';
import styles from './ContextMenu.module.css';
export default (_ref => {
  let {
    MetricNode,
    setOptions,
    onDeleteChartClick
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    activeMetrics,
    data,
    title,
    chartRef
  } = props;

  function toggleScale() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isLogScale: !state.isLogScale
    }));
  }

  function toggleCartesianGrid() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isCartesianGridActive: saveToggle('isCartesianGridActive', !state.isCartesianGridActive)
    }));
  }

  function toggleClosestData() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isClosestDataActive: saveToggle('isClosestDataActive', !state.isClosestDataActive)
    }));
  }

  function toggleWatermarkLighter() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isWatermarkLighter: saveToggle('isWatermarkLighter', !state.isWatermarkLighter)
    }));
  }

  function toggleWatermarkVisibility() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isWatermarkVisible: saveToggle('isWatermarkVisible', !state.isWatermarkVisible)
    }));
  }

  return /*#__PURE__*/React.createElement(ChartSettingsContextMenu, _extends({}, props, {
    onScaleChange: toggleScale,
    onCartesianGridChange: toggleCartesianGrid,
    onClosestDataChange: toggleClosestData,
    onWatermarkLighterChange: toggleWatermarkLighter,
    onWatermarkVisibilityChange: toggleWatermarkVisibility
  }), /*#__PURE__*/React.createElement(ChartDownloadBtn, {
    fluid: true,
    variant: "ghost",
    metrics: activeMetrics,
    data: data,
    title: title,
    chartRef: chartRef,
    MetricNode: MetricNode
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "save"
  }), "Download as PNG"), onDeleteChartClick && /*#__PURE__*/React.createElement(Button, {
    fluid: true,
    variant: "ghost",
    onClick: onDeleteChartClick,
    className: styles.delete
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "remove-small",
    className: styles.icon
  }), "Delete chart"));
});
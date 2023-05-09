const _excluded = ["data", "metrics", "topic", "settings", "setCurrentPoint", "isCompact"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Tooltip from './Tooltip';
import SANChart from '../../../ducks/Chart/Modular';
import Lines from '../../../ducks/Chart/Lines';
import Bars from '../../../ducks/Chart/Bars';
import Signals from '../../../ducks/Chart/Signals';
import { useMetricCategories } from '../../../ducks/Chart/Synchronizer';
const CHART_HEIGHT = 150;
const CHART_COMPACT_HEIGHT = 112;
const CHART_COLORS = {
  social_volume_total: '#68DBF4',
  price_usd: '#26C953'
};
const CHART_PADDING = {
  top: 5,
  right: 16,
  bottom: 5,
  left: 16
};
const CHART_COMPACT_PADDING = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const Canvas = _ref => {
  let {
    data,
    metrics,
    topic,
    settings,
    setCurrentPoint,
    isCompact
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(SANChart, _extends({}, props, {
    data: data,
    height: isCompact ? CHART_COMPACT_HEIGHT : CHART_HEIGHT,
    padding: isCompact ? CHART_COMPACT_PADDING : CHART_PADDING,
    colors: CHART_COLORS,
    categories: useMetricCategories(metrics)
  }), /*#__PURE__*/React.createElement(Bars, null), !isCompact && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Lines, null), /*#__PURE__*/React.createElement(Tooltip, {
    setCurrentPoint: setCurrentPoint
  }), /*#__PURE__*/React.createElement(Signals, _extends({}, settings, {
    useShortRecord: true,
    selector: "text",
    width: 13,
    data: data,
    metrics: metrics,
    slug: topic
  }))));
};

export default Canvas;
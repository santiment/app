function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { getChartColors } from '../../Chart/colors';
const DEFAULT_STATE = {};
const ColorContext = /*#__PURE__*/React.createContext();
const ColorUpdaterContext = /*#__PURE__*/React.createContext();

function ColorProvider({
  widget,
  children,
  rerenderWidgets
}) {
  const {
    metrics,
    MetricColor
  } = widget;
  const [state, setState] = useState(MetricColor || DEFAULT_STATE);

  function updateMetricColor(metricKey, color) {
    const NewMetricColor = _extends({}, state, {
      [metricKey]: color
    });

    widget.MetricColor = NewMetricColor;
    setState(NewMetricColor);
    rerenderWidgets();
  }

  useEffect(() => {
    const NewMetricColor = getChartColors(metrics, state);
    widget.MetricColor = NewMetricColor;
    setState(NewMetricColor);
  }, [metrics]);
  return /*#__PURE__*/React.createElement(ColorContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(ColorUpdaterContext.Provider, {
    value: updateMetricColor
  }, children));
}

export function useMetricColor() {
  return React.useContext(ColorContext);
}
export function useColorByMetric({
  key
}) {
  return React.useContext(ColorContext)[key];
}
export function useMetricColorUpdater() {
  return React.useContext(ColorUpdaterContext);
}
export default ColorProvider;
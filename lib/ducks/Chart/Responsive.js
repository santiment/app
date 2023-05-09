const _excluded = ["children", "padding", "chartRef"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useRef, useEffect } from 'react';
import { Chart } from './Modular';
import { withChartContext } from './context';
const IFRAME_STYLES = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: 0,
  top: 0,
  zIndex: -1
};
const DEFAULT_STATE = {};

const ResponsiveChart = _ref => {
  let {
    children,
    padding,
    chartRef
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const iframeRef = useRef(null);
  const iframe = iframeRef.current;
  const [dimensions, setDimensions] = useState(DEFAULT_STATE);
  useEffect(() => {
    if (!iframe) return;

    iframe.contentWindow.onresize = () => setDimensions({
      height: iframe.offsetHeight,
      width: iframe.offsetWidth
    });
  }, [iframe]);
  return /*#__PURE__*/React.createElement(Chart, _extends({}, props, dimensions, {
    padding: padding,
    chartRef: chartRef
  }), children, /*#__PURE__*/React.createElement("iframe", {
    title: "resizer",
    ref: iframeRef,
    frameBorder: "0",
    style: IFRAME_STYLES
  }));
};

export default withChartContext(ResponsiveChart);
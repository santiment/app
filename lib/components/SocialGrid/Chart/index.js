const _excluded = ["metrics", "settingMap", "settings", "priceTicker", "onLoad", "isCompact"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useMemo } from 'react';
import { usdFormatter } from 'studio/metrics/formatters';
import Loader from '@santiment-network/ui/Loader/Loader';
import Canvas from './Canvas';
import HoveredValue from '../Tooltip';
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks';
import styles from '../index.module.css';

const Chart = _ref => {
  let {
    metrics,
    settingMap,
    settings,
    priceTicker,
    onLoad,
    isCompact
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [currentPoint, setCurrentPoint] = useState();
  const [data, loadings] = useTimeseries(metrics, settings, settingMap);
  const lastPrice = useMemo(() => {
    for (let i = data.length - 1; i > 0; i--) {
      const point = data[i];
      if (point.price_usd !== undefined) return point;
    }
  }, [data]);
  useEffect(() => {
    if (loadings.length === 0) onLoad();
  }, [loadings]);
  return loadings.length > 0 ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, !isCompact && /*#__PURE__*/React.createElement(React.Fragment, null, currentPoint && /*#__PURE__*/React.createElement(HoveredValue, currentPoint), /*#__PURE__*/React.createElement("div", {
    className: 'mrg-l mrg--l'
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-green mrg-xs mrg--r"
  }, usdFormatter((currentPoint || lastPrice).price_usd)), priceTicker, "/USD")), /*#__PURE__*/React.createElement(Canvas, _extends({}, props, {
    settings: settings,
    data: data,
    metrics: metrics,
    setCurrentPoint: setCurrentPoint,
    isCompact: isCompact
  })));
};

export default Chart;
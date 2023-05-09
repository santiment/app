const _excluded = ["metrics", "onToggleMetric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import Icon from '@santiment-network/ui/Icon';
import { POPULAR_METRICS } from './defaults';
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard';
import styles from './MobilePopularMetrics.module.css';
const LS_LABEL = 'TOOLTIP_MOBILE_METRICS_SWIPES';

const MobilePopularMetrics = _ref => {
  let {
    metrics: activeMetrics = [],
    onToggleMetric
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [isShow, setIsShow] = useState(false);
  const [wasShown] = useState(localStorage.getItem(LS_LABEL));
  const [savedMetrics] = useState(activeMetrics);

  const hideTooltip = () => {
    localStorage.setItem(LS_LABEL, '+');
    setIsShow(false);
  };

  useEffect(() => {
    if (!wasShown) {
      setIsShow(true);
    }
  }, []);
  const metrics = POPULAR_METRICS.filter(metric => !activeMetrics.includes(metric));
  return metrics.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Popular metrics"), isShow && /*#__PURE__*/React.createElement("div", {
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.text
  }, "Swipe left to add or remove a metric. Swipe right to learn more about the selected metric."), /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.close,
    onClick: hideTooltip
  })), metrics.map(metric => /*#__PURE__*/React.createElement(MobileMetricCard, _extends({
    useInitialAnimation: activeMetrics.length > 0 || savedMetrics !== activeMetrics,
    metric: metric,
    onToggleMetric: () => {
      onToggleMetric(metric);

      if (isShow) {
        hideTooltip();
      }
    },
    key: metric.label + 'popular'
  }, rest)))) : null;
};

export default MobilePopularMetrics;
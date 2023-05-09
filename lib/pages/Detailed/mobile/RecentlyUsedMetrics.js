const _excluded = ["metrics", "onToggleMetric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard';
import { Metric } from '../../../ducks/dataHub/metrics';
import { getRecentMetrics } from '../../../utils/recent';
import styles from './MobilePopularMetrics.module.css';
const ARRAY = [];

const RecentlyUsedMetrics = _ref => {
  let {
    metrics: activeMetrics = ARRAY,
    onToggleMetric
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const recents = getRecentMetrics() || ARRAY;
  const [savedMetrics] = useState(activeMetrics);
  const metrics = recents.filter(key => !activeMetrics.includes(Metric[key])).slice(0, 3);
  return metrics.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Recently used metrics"), metrics.map(key => /*#__PURE__*/React.createElement(MobileMetricCard, _extends({
    useInitialAnimation: activeMetrics.length > 0 || savedMetrics !== activeMetrics,
    metric: Metric[key],
    onToggleMetric: () => onToggleMetric(Metric[key]),
    key: key + 'recent'
  }, rest)))) : null;
};

export default RecentlyUsedMetrics;
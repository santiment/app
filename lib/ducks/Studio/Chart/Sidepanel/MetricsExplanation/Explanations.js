const _excluded = ["metric"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import MetricHighLow from '../../../../../components/MetricHighLow';
import PriceChangesWidget from '../../../../../components/PriceChangesWidget/PriceChangesWidget';
import { Metric } from '../../../../dataHub/metrics';
import styles from './Explanations.module.css';
const RANGE_HOURS = [{
  range: '7d',
  hours: 24 * 7
}, {
  range: '1m',
  hours: 24 * 30
}, {
  range: '3m',
  hours: 24 * 90
}, {
  range: '6m',
  hours: 24 * 180
}];

const HighLow = props => /*#__PURE__*/React.createElement(MetricHighLow, _extends({}, props, {
  className: styles.highLow,
  rangeHours: RANGE_HOURS
}));

export const Explanation = _extends(Object.create(null), {
  [Metric.price_usd.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(PriceChangesWidget, {
    className: styles.highLow,
    slug: slug,
    rangeHours: RANGE_HOURS
  }),
  [Metric.social_volume_total.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(HighLow, {
    slug: slug,
    metric: "social_volume_total",
    label: "Social Volume"
  }),
  [Metric.social_dominance_total.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(HighLow, {
    slug: slug,
    metric: "social_dominance_total",
    label: "Social Dominance"
  }),
  [Metric.velocity.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(HighLow, {
    slug: slug,
    metric: "velocity",
    label: "Token Velocity"
  }),
  [Metric.daily_active_addresses.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(HighLow, {
    slug: slug,
    metric: "daily_active_addresses",
    label: "DAA"
  }),
  [Metric.network_growth.key]: ({
    slug
  }) => /*#__PURE__*/React.createElement(HighLow, {
    slug: slug,
    metric: "network_growth",
    label: "Network Growth"
  })
});
export default (_ref => {
  let {
    metric
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const Component = Explanation[metric.key];
  return Component ? /*#__PURE__*/React.createElement(Component, rest) : null;
});
const _excluded = ["metric", "colors", "ticker", "onToggleMetric", "hasPremium", "errorsMetricsKeys", "slug"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import Dialog from '@santiment-network/ui/Dialog';
import Loader from '@santiment-network/ui/Loader/Loader';
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip';
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks';
import PercentChanges from '../PercentChanges';
import { calcPercentageChange } from '../../utils/utils';
import { Metric } from '../../ducks/dataHub/metrics';
import { Description } from '../../ducks/dataHub/metrics/descriptions';
import MetricDescription from '../../ducks/SANCharts/MetricDescription/MetricDescription';
import SwipeableCard from './SwipeableCard';
import { DEFAULT_SETTINGS } from './settings';
import styles from './MobileMetricCard.module.css';

const MobileMetricCard = _ref => {
  let {
    metric,
    colors = {},
    ticker = '',
    onToggleMetric,
    hasPremium,
    errorsMetricsKeys,
    slug
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const {
    label,
    key,
    dataKey = key
  } = metric;
  const [settings, setSettings] = useState(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), {}, {
    slug
  }));
  const [data, loadings] = useTimeseries([metric], settings);
  useEffect(() => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      slug
    }));
  }, [slug]);
  let errorText = errorsMetricsKeys[dataKey] && 'Failed to fetch the data';
  let value = null;
  let diff = null;
  let period = '24h';

  if (data.length >= 2) {
    const lastIndex = data.length - 1;
    const today = data[lastIndex][dataKey];
    const yesterday = data[lastIndex - 1][dataKey];
    value = `${formatTooltipValue(false, today)} ${metric === Metric.transaction_volume ? ticker : ''}`;
    diff = calcPercentageChange(yesterday, today);
  }

  if (metric === Metric.dev_activity) {
    const {
      devActivity60: first,
      devActivity30: second
    } = rest.project;

    if (first != null && second != null) {
      diff = calcPercentageChange(first * 2 - second, second);
      value = second.toFixed(2);
      period = '30d';
    } else {
      errorText = 'No data';
    }
  }

  return /*#__PURE__*/React.createElement(SwipeableCard, _extends({
    onLeftActionClick: () => setIsOpenDescription(true),
    onRightActionClick: onToggleMetric,
    hasLeftAction: Description[dataKey]
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.row_top)
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.metric
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.row_bottom),
    style: {
      '--color': colors[metric.key] || ''
    }
  }, loadings.length > 0 ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }) : errorText ? /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, errorText) : value ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", {
    className: styles.value
  }, value), diff !== null && /*#__PURE__*/React.createElement(PercentChanges, {
    changes: diff,
    className: styles.diff
  }), period && /*#__PURE__*/React.createElement(Label, {
    accent: "casper",
    className: styles.period
  }, ", ", period)) : !hasPremium ? /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, "Go PRO to see the latest data") : null)), Description[dataKey] && /*#__PURE__*/React.createElement(Dialog, {
    title: label,
    open: isOpenDescription,
    onClose: () => setIsOpenDescription(false)
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.dialog
  }, /*#__PURE__*/React.createElement(MetricDescription, {
    metric: metric,
    project: rest.project
  }))));
};

export default MobileMetricCard;
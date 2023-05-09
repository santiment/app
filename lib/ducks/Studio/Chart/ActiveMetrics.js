const _excluded = ["className", "metrics", "metric", "colors", "error", "metricSettings", "favoriteMetricSet", "isLoggedIn", "isWithIcon", "isLoading", "isRemovable", "isWithSettings", "toggleMetric", "errorsForMetrics", "settings", "onSettingsClick", "onLockClick"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import MetricLock from './MetricLock';
import MetricFavorite from './MetricFavorite';
import MetricErrorExplanation from './MetricErrorExplanation/MetricErrorExplanation';
import MetricIcon from '../../SANCharts/MetricIcon';
import { getMetricLabel } from '../../dataHub/metrics/labels';
import { useFavoriteMetrics } from '../../../stores/user/metrics';
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip';
import { ApiErrorsProvider, useApiErrors } from './hooks/ApiErrorsContext';
import styles from './ActiveMetrics.module.css';

const Actions = ({
  children,
  childrenOffset,
  isActive
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.settings, isActive && styles.settings_active),
  style: {
    '--items': children.length - childrenOffset
  }
}, /*#__PURE__*/React.createElement("div", {
  className: styles.settings__visible
}, children));

const Customization = ({
  metric,
  onClick
}) => /*#__PURE__*/React.createElement(ExplanationTooltip, {
  text: "Metric settings"
}, /*#__PURE__*/React.createElement("div", {
  className: styles.settings__btn,
  onClick: () => onClick(metric)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "settings"
})));

const LockInfo = ({
  metric
}) => /*#__PURE__*/React.createElement(ExplanationTooltip, {
  offsetY: 6,
  align: "start",
  text: `Metric is locked to ${metric.project.ticker}`
}, /*#__PURE__*/React.createElement("div", {
  className: styles.lock
}, /*#__PURE__*/React.createElement("svg", {
  width: "8",
  height: "8",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3 3h2v-.5c0-.4-.12-.63-.23-.75-.09-.1-.3-.25-.77-.25-.48 0-.68.15-.77.25-.11.12-.23.35-.23.75V3zM1.5 3h-.13C.9 3 .5 3.33.5 3.73v3.54c0 .4.4.73.88.73h5.25c.48 0 .87-.33.87-.73V3.73c0-.4-.4-.73-.88-.73H6.5v-.5C6.5 1.12 5.67 0 4 0S1.5 1.12 1.5 2.5V3z"
}))));

const MetricButton = _ref => {
  let {
    className,
    metrics,
    metric,
    colors,
    error,
    metricSettings,
    favoriteMetricSet,
    isLoggedIn,
    isWithIcon,
    isLoading,
    isRemovable,
    isWithSettings,
    toggleMetric,
    errorsForMetrics,
    settings,
    onSettingsClick,
    onLockClick
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    key,
    dataKey = key,
    node
  } = metric;
  const label = getMetricLabel(metric, settings);
  return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
    border: true,
    className: cx(styles.btn, error && styles.btn_error, isWithSettings && styles.btn_settings, className),
    "aria-invalid": error
  }), metric.project && /*#__PURE__*/React.createElement(LockInfo, {
    metric: metric
  }), isWithIcon ? isLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles.loader
  }) : /*#__PURE__*/React.createElement(MetricIcon, {
    node: node,
    color: colors[dataKey],
    className: styles.label
  }) : null, label, /*#__PURE__*/React.createElement(MetricErrorExplanation, {
    errorsForMetrics: errorsForMetrics,
    metric: metric,
    settings: settings
  }), isRemovable && /*#__PURE__*/React.createElement(Icon, {
    type: "close-small",
    className: styles.icon,
    onClick: () => toggleMetric(metric)
  }), isWithSettings && /*#__PURE__*/React.createElement(Actions, {
    isActive: metricSettings === metric,
    childrenOffset: 1 - isLoggedIn
  }, /*#__PURE__*/React.createElement(Customization, {
    metric: metric,
    onClick: onSettingsClick
  }), /*#__PURE__*/React.createElement(MetricLock, {
    metrics: metrics,
    metric: metric,
    project: settings,
    onClick: onLockClick
  }), isLoggedIn && /*#__PURE__*/React.createElement(MetricFavorite, {
    metric: metric,
    favoriteMetricSet: favoriteMetricSet
  })));
};

const ActiveMetrics = ({
  className,
  MetricColor,
  activeMetrics,
  metricSettings,
  loadings,
  toggleMetric,
  ErrorMsg = {},
  isLoggedIn,
  isSingleWidget,
  isWithIcon = true,
  isWithSettings = false,
  onLockClick,
  onMetricHover,
  onMetricHoverEnd,
  onSettingsClick,
  settings
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || !isSingleWidget;
  const {
    favoriteMetrics
  } = useFavoriteMetrics();
  const favoriteMetricSet = useMemo(() => new Set(favoriteMetrics), [favoriteMetrics]);
  const errorsForMetrics = useApiErrors();
  const errors = settings && errorsForMetrics ? errorsForMetrics[settings.slug] : {};
  return activeMetrics.map((metric, i) => /*#__PURE__*/React.createElement(MetricButton, {
    key: metric.key,
    className: className,
    metrics: activeMetrics,
    metric: metric,
    colors: MetricColor,
    error: ErrorMsg[metric.key],
    metricSettings: metricSettings,
    isWithIcon: isWithIcon,
    isLoggedIn: isLoggedIn,
    isLoading: loadings.includes(metric),
    isRemovable: isMoreThanOneMetric && toggleMetric,
    isWithSettings: isWithSettings,
    toggleMetric: toggleMetric,
    onLockClick: onLockClick && (() => onLockClick(metric)),
    onMouseEnter: onMetricHover && (e => onMetricHover(metric, e)),
    onMouseLeave: onMetricHoverEnd && (() => onMetricHoverEnd(metric)),
    onSettingsClick: onSettingsClick,
    errorsForMetrics: errors,
    settings: settings,
    favoriteMetricSet: favoriteMetricSet
  }));
};

export default (props => {
  return /*#__PURE__*/React.createElement(ApiErrorsProvider, null, /*#__PURE__*/React.createElement(ActiveMetrics, props));
});
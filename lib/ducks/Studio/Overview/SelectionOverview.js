const _excluded = ["items", "label", "onToggle"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Overview from './Overview';
import ActiveMetrics from '../Chart/ActiveMetrics';
import styles from './SelectionOverview.module.css';
const MetricColor = {};
const loadings = [];

const SelectionInfo = _ref => {
  let {
    items,
    label,
    onToggle
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.left__row
  }, "You have selected ", items.length, " ", label, "(s):", /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, /*#__PURE__*/React.createElement(ActiveMetrics, _extends({}, props, {
    className: styles.metric,
    activeMetrics: items,
    MetricColor: MetricColor,
    loadings: loadings,
    toggleMetric: onToggle,
    isSingleWidget: false
  }))));
};

const SelectionOverview = ({
  widgets,
  currentPhase,
  selectedMetrics,
  selectedWidgets,
  toggleMetric,
  toggleWidget,
  resetSelecion,
  onClose,
  onWidgetClick,
  onNewChartClick,
  setWidgets
}) => /*#__PURE__*/React.createElement(Overview, {
  widgets: widgets,
  currentPhase: currentPhase,
  selectedMetrics: selectedMetrics,
  onClose: onClose,
  onWidgetClick: onWidgetClick,
  onNewChartClick: onNewChartClick,
  setWidgets: setWidgets
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.selection, (selectedMetrics.length || selectedWidgets.length) && styles.selection_visible)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.left
}, selectedMetrics.length ? /*#__PURE__*/React.createElement(SelectionInfo, {
  label: "metric",
  items: selectedMetrics,
  onToggle: toggleMetric
}) : null, selectedWidgets.length ? /*#__PURE__*/React.createElement(SelectionInfo, {
  label: "widget",
  items: selectedWidgets,
  onToggle: toggleWidget,
  isWithIcon: false
}) : null), /*#__PURE__*/React.createElement(Button, {
  className: styles.clear,
  onClick: resetSelecion
}, "Clear selected")));

export default SelectionOverview;
const _excluded = ["metric", "withChildren", "isComplexityError", "children", "project"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Tooltip from '@santiment-network/ui/Tooltip';
import { Event } from '../dataHub/events';
import { Description } from '../dataHub/metrics/descriptions';
import MetricDescription from './MetricDescription/MetricDescription';
import MetricVideoBtn from '../dataHub/metrics/MetricVideoBtn';
import styles from './MetricExplanation.module.css';

const Note = ({
  children
}) => /*#__PURE__*/React.createElement("p", {
  className: styles.note
}, /*#__PURE__*/React.createElement("span", {
  className: styles.warning
}, "Important!"), /*#__PURE__*/React.createElement("span", {
  className: styles.text
}, children));

Event.trendPositionHistory.note = /*#__PURE__*/React.createElement(Note, null, "It will disable Anomalies");
const COMPLEXITY_NOTE = 'The requested period is outside of your plan boundaries';

const MetricExplanation = _ref => {
  let {
    metric,
    withChildren = false,
    isComplexityError,
    children,
    project = {}
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    key,
    label,
    fullTitle = label,
    note
  } = metric;
  const description = Description[key];

  if (!description && isComplexityError) {
    return /*#__PURE__*/React.createElement(Tooltip, _extends({
      className: styles.explanation,
      trigger: children
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: styles.explanation__content
    }, /*#__PURE__*/React.createElement(Note, null, COMPLEXITY_NOTE)));
  }

  return description ? /*#__PURE__*/React.createElement(Tooltip, _extends({
    className: styles.explanation,
    trigger: children
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: styles.explanation__content
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, fullTitle), /*#__PURE__*/React.createElement("p", {
    className: styles.text
  }, /*#__PURE__*/React.createElement(MetricDescription, {
    metric: metric,
    project: project
  })), note && note, /*#__PURE__*/React.createElement(MetricVideoBtn, {
    metric: metric
  }), isComplexityError && /*#__PURE__*/React.createElement(Note, null, COMPLEXITY_NOTE))) : withChildren ? children : null;
};

export default MetricExplanation;
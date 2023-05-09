const _excluded = ["metric", "children", "isActive", "isMobile", "error", "label"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip';
import MetricExplanation from './MetricExplanation';
import styles from './ChartMetricSelector.module.css';

const ToggleMetricButton = _ref => {
  let {
    metric,
    children,
    isActive,
    isMobile,
    error = '',
    label
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const isComplexityError = error.includes('complexity') || error.includes('outside');
  const noData = error && !isComplexityError;
  return isMobile ? /*#__PURE__*/React.createElement(Button, _extends({
    className: styles.mobileButton
  }, props), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.mobileButton__text, isActive && styles.mobileButton__text_active)
  }, label), /*#__PURE__*/React.createElement(Icon, {
    type: isActive ? 'remove' : 'plus-round'
  })) : /*#__PURE__*/React.createElement(Button, _extends({
    variant: "ghost",
    fluid: true,
    className: styles.btn,
    classes: styles,
    isActive: isActive,
    disabled: error
  }, props), /*#__PURE__*/React.createElement("div", {
    className: styles.btn__left
  }, noData ? /*#__PURE__*/React.createElement("span", {
    className: styles.btn_disabled
  }, "no data") : /*#__PURE__*/React.createElement(ExplanationTooltip, {
    className: styles.btn__expl,
    text: isActive ? 'Remove metric' : 'Add metric',
    offsetY: 8
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.btn__action, isActive ? styles.btn__action_remove : styles.btn__action_add)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: isActive ? 'close-small' : 'plus-small'
  }))), ' ', label), /*#__PURE__*/React.createElement(MetricExplanation, {
    metric: metric,
    isComplexityError: isComplexityError
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: styles.info
  })));
};

export default ToggleMetricButton;
const _excluded = ["className", "active", "status", "stepNumber", "disabled", "description", "title", "icons", "stepIndex", "onStepClick", "onClick", "selected"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import StepIcon from './StepIcon/StepIcon';
import { getClassString } from '../utils';
import styles from './Step.module.css';

const Step = _ref => {
  let {
    className,
    active,
    status = 'wait',
    stepNumber,
    disabled,
    description,
    title,
    icons,
    stepIndex,
    onStepClick,
    onClick,
    selected
  } = _ref,
      restProps = _objectWithoutProperties(_ref, _excluded);

  function handleClick(...args) {
    if (onClick) {
      onClick(...args);
    }

    onStepClick(stepIndex);
  }

  const classString = cx(selected && styles.selected, getClassString(styles, disabled, status));
  const accessibilityProps = {
    role: 'button',
    tabIndex: 0
  };

  if (!disabled) {
    if (onStepClick) {
      accessibilityProps.onClick = handleClick;
    } else if (onClick) {
      accessibilityProps.onClick = onClick;
    }
  }

  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: cx(styles.wrapper, classString, className)
  }), /*#__PURE__*/React.createElement("div", _extends({}, accessibilityProps, {
    className: styles.container
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.tail
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.contentWrapper
  }, /*#__PURE__*/React.createElement(StepIcon, {
    disabled: disabled,
    stepNumber: stepNumber,
    icons: icons,
    status: status
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description || null)))));
};

export default Step;
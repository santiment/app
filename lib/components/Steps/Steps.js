const _excluded = ["className", "children", "current", "initial", "icons", "onChange", "selected"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement } from 'react';
import cx from 'classnames';
import Step from './Step/Step';
import styles from './Steps.module.css';

const Steps = _ref => {
  let {
    className,
    children,
    current,
    initial,
    icons,
    onChange,
    selected
  } = _ref,
      restProps = _objectWithoutProperties(_ref, _excluded);

  function onStepClick(next) {
    if (onChange && current !== next) {
      onChange(next);
    }
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx(styles.steps, className)
  }, restProps), React.Children.map(children, (child, index) => {
    const stepNumber = initial + index;

    const childProps = _objectSpread({
      stepNumber: `${stepNumber + 1}`,
      stepIndex: stepNumber,
      key: stepNumber,
      icons,
      onStepClick: onChange && onStepClick,
      selected
    }, child.props);

    if (!child.props.status) {
      if (stepNumber === current) {
        childProps.status = 'selected';
      } else if (stepNumber < current) {
        childProps.status = 'visited';
      } else {
        childProps.status = 'wait';
      }
    }

    childProps.active = stepNumber === current;
    return /*#__PURE__*/cloneElement(child, childProps);
  }));
};

Steps.Step = Step;
Steps.defaultProps = {
  initial: 0,
  current: 0,
  size: ''
};
export default Steps;
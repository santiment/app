const _excluded = ["forwardedRef", "isActive"],
      _excluded2 = ["forwardedRef", "isActive"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import styles from './AlertTooltip.module.css';
export const WarningTrigger = _ref => {
  let {
    forwardedRef,
    isActive
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    ref: forwardedRef
  }, props, {
    className: cx('btn row hv-center', styles.btn, isActive && styles.btnHover)
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "alert"
  }));
};
export const ErrorTrigger = _ref2 => {
  let {
    forwardedRef,
    isActive
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement("div", _extends({
    ref: forwardedRef
  }, props, {
    className: cx('btn row hv-center', styles.btnError, isActive && styles.btnErrorHover)
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "bell-off"
  }));
};

const AlertTooltip = ({
  isVisible,
  content,
  type,
  tooltipClassname
}) => {
  if (!isVisible) {
    return null;
  }

  let trigger = /*#__PURE__*/React.createElement(WarningTrigger, null);

  if (type === 'error') {
    trigger = /*#__PURE__*/React.createElement(ErrorTrigger, null);
  }

  return /*#__PURE__*/React.createElement(Tooltip, {
    passOpenStateAs: "isActive",
    trigger: trigger,
    position: "bottom",
    className: cx(styles.tooltip, tooltipClassname, 'border box')
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative row body-3"
  }, content));
};

export default AlertTooltip;
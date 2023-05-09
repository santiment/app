const _excluded = ["className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import AdvancedCalendarPopup from './Popup';
import Input from './Input';
import { getDateFormats } from '../../utils/dates';
import styles from './index.module.css';

const getDateLabel = date => {
  const {
    DD,
    MM,
    YY
  } = getDateFormats(date);
  return `${DD}/${MM}/${YY}`;
};

const checkSameDates = (from, to) => from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();

const Trigger = ({
  from,
  to,
  isActive,
  className,
  forwardedRef,
  onClick,
  onCalendarChange
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isActive && styles.active, className),
    onClick: onClick,
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement(Input, {
    value: checkSameDates(from, to) ? getDateLabel(from) : `${getDateLabel(from)} - ${getDateLabel(to)}`,
    onCalendarChange: onCalendarChange
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down",
    className: styles.arrow
  }));
};

export default (_ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(AdvancedCalendarPopup, _extends({}, props, {
    trigger: /*#__PURE__*/React.createElement(Trigger, _extends({}, props, {
      className: className
    }))
  }));
});
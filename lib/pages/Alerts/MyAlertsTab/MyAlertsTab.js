const _excluded = ["currentAmount", "maxAmount", "forwardedRef", "isActive"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Tooltip from '@santiment-network/ui/Tooltip';
import styles from './MyAlertsTab.module.css';

const Trigger = _ref => {
  let {
    currentAmount,
    maxAmount,
    forwardedRef,
    isActive
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    ref: forwardedRef
  }, props, {
    className: cx(styles.badge, 'btn body-3 row hv-center c-waterloo', isActive && styles.badgeHover)
  }), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.currentAmount, 'c-black')
  }, currentAmount), "/", maxAmount);
};

const MyAlertsTab = ({
  alertsRestrictions: {
    currentAmount,
    maxAmount
  }
}) => /*#__PURE__*/React.createElement("div", {
  className: "row hv-center"
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.tab, 'btn c-casper h4 txt-m')
}, "My Alerts"), maxAmount <= 20 && /*#__PURE__*/React.createElement(Tooltip, {
  passOpenStateAs: "isActive",
  trigger: /*#__PURE__*/React.createElement(Trigger, {
    currentAmount: currentAmount,
    maxAmount: maxAmount
  }),
  position: "bottom",
  className: cx(styles.tooltip, 'border box')
}, /*#__PURE__*/React.createElement("div", {
  className: "relative column body-3"
}, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
  className: "txt-m"
}, currentAmount, " alerts"), " created out of ", maxAmount, ' ', "available. To unlock more alerts please"), /*#__PURE__*/React.createElement(Link, {
  to: "/pricing",
  className: cx(styles.link, 'txt-m')
}, "Upgrade your Plan!"))));

export default MyAlertsTab;
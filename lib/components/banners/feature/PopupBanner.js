const _excluded = ["trigger", "children", "className", "noContainer"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import { PATHS } from '../../../paths';
import { useUser } from '../../../stores/user';
import styles from './PopupBanner.module.css';

const PopupBanner = _ref => {
  let {
    trigger: Trigger,
    children,
    className,
    noContainer
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    isLoggedIn
  } = useUser();

  if (isLoggedIn) {
    return children || null;
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({}, props, {
    title: "",
    classes: {
      title: styles.header
    },
    trigger: Trigger ? /*#__PURE__*/React.createElement(Trigger, null) : noContainer ? children : /*#__PURE__*/React.createElement("div", null, children)
  }), /*#__PURE__*/React.createElement(LoginWarning, {
    className: className
  }));
};

export const LoginWarning = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Log in to use this feature!"), /*#__PURE__*/React.createElement("p", {
    className: styles.desc
  }, "Log in to access more Sanbase features including real-time metrics, market alerts, personalized watchlists and other information on 1500+ cryptocurrencies"), /*#__PURE__*/React.createElement("div", {
    className: styles.buttons
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    as: Link,
    to: PATHS.LOGIN,
    className: styles.btn
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    as: Link,
    to: PATHS.CREATE_ACCOUNT,
    border: true,
    className: cx(styles.btn, styles.createAccBtn)
  }, "Create an account"), /*#__PURE__*/React.createElement("div", {
    className: styles.new
  }, "New to Santiment?", ' ', /*#__PURE__*/React.createElement(Link, {
    to: PATHS.CREATE_ACCOUNT,
    className: styles.createLink
  }, "Create an account"))));
};
export default PopupBanner;
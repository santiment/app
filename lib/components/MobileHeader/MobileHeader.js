function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import Svg from 'webkit/ui/Svg/react';
import styles from './MobileHeader.module.css';
const defaultClasses = {
  wrapper: styles.wrapper,
  icon: styles.icon,
  title: styles.title
};

const MobileHeader = ({
  title,
  // if we have goBack func, onClick of title element is goBack func
  goBack,
  // if we have backRoute, title element is a link with 'to' param === backRoute
  backRoute,
  rightActions,
  classes: _classes = {},
  showBack = false,
  showSearch = true,
  children
}) => {
  const classes = _objectSpread(_objectSpread({}, defaultClasses), _classes);

  const Title = backRoute && !goBack ? Link : 'div';
  return /*#__PURE__*/React.createElement("div", {
    className: cx(classes.wrapper, 'row v-center justify')
  }, /*#__PURE__*/React.createElement(Title, {
    onClick: goBack && goBack,
    to: backRoute,
    className: cx(classes.left, _classes.back)
  }, (backRoute || showBack) && /*#__PURE__*/React.createElement(Svg, {
    w: 10,
    h: 17,
    className: classes.icon,
    id: "arrow-right"
  }), title && /*#__PURE__*/React.createElement("h1", {
    className: cx(styles.title, 'nowrap line-clamp h4 txt-m nowrap mrg-l mrg--r')
  }, title)), children, /*#__PURE__*/React.createElement("div", {
    className: cx(classes.right, 'row v-center')
  }, rightActions, showSearch && /*#__PURE__*/React.createElement(Link, {
    to: "/search",
    className: "row v-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "search",
    width: "18",
    height: "18"
  }))));
};

MobileHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  backRoute: PropTypes.string,
  rightActions: PropTypes.node,
  goBack: PropTypes.func
};
export default MobileHeader;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import UserAvatar from '../../../../pages/Account/avatar/UserAvatar';
import { personalLocation } from '../../../../pages/feed/GeneralFeed/locations';
import styles from './SignalCreator.module.css';
export const showUserActions = () => window && window.location && window.location.pathname !== personalLocation;

const SignalCreator = ({
  className,
  onClick,
  classes = {},
  user: {
    id,
    username,
    email,
    avatarUrl
  } = {},
  children
}) => {
  const show = showUserActions();

  if (!show) {
    return null;
  }

  const nameOrEmail = username ? `@${username}` : email;
  return /*#__PURE__*/React.createElement(Link, {
    to: '/profile/' + id,
    className: cx(styles.container, className),
    onClick: e => {
      e.stopPropagation();
      onClick && onClick();
    }
  }, /*#__PURE__*/React.createElement(UserAvatar, {
    userId: id,
    externalAvatarUrl: avatarUrl,
    classes: _objectSpread(_objectSpread({}, styles), classes)
  }), nameOrEmail && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.right, !id && styles.withoutUser, classes.username)
  }, nameOrEmail, children));
};

export default SignalCreator;
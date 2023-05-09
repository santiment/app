import React from 'react';
import cx from 'classnames';
import styles from './AvatarWithName.module.css';
import UserAvatar from '../../pages/Account/avatar/UserAvatar';
import { Link } from 'react-router-dom';

const AvatarWithName = ({
  user,
  classes = {}
}) => {
  if (!user || !user.id) {
    return null;
  }

  const {
    id,
    username,
    avatarUrl
  } = user;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.avatarBlock, classes.avatarBlock)
  }, /*#__PURE__*/React.createElement(Link, {
    to: '/profile/' + id
  }, /*#__PURE__*/React.createElement(UserAvatar, {
    as: "div",
    userId: id,
    externalAvatarUrl: avatarUrl,
    classes: styles
  })), username && /*#__PURE__*/React.createElement(Link, {
    to: '/profile/' + id
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.username, classes.username)
  }, username)));
};

export default AvatarWithName;
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { DesktopOnly } from '../Responsive';
import { getDateFormats } from '../../utils/dates';
import UserAvatar from '../../pages/Account/avatar/UserAvatar';
import styles from './ProfileInfo.module.css';

const ProfileInfo = ({
  authorName,
  state,
  networkStatus,
  picUrl,
  className = '',
  infoClassName = '',
  date,
  showDate = false,
  withPic,
  authorId
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, withPic && /*#__PURE__*/React.createElement("div", {
    className: styles.icon
  }, /*#__PURE__*/React.createElement(UserAvatar, {
    userId: authorId,
    externalAvatarUrl: picUrl
  }), networkStatus && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.onlineIndicator, styles[networkStatus])
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info, infoClassName)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info__item, styles.name)
  }, /*#__PURE__*/React.createElement(Link, {
    className: styles.name,
    to: `/profile/${authorId}`
  }, authorName)), showDate && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(InsightDate, {
    date: date,
    state: state
  }))));
};

export const InsightDate = ({
  date,
  state,
  className
}) => {
  const {
    DD,
    MMM,
    YYYY
  } = getDateFormats(new Date(date));
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info__item, styles.status, className)
  }, MMM, " ", DD, ", ", YYYY);
};
export default ProfileInfo;
import React from 'react';
import { NoNotificationsSvg } from './utils';
import styles from './NoNotitications.module.css';

const NoNotitications = ({
  description,
  showSvg
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, showSvg && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.rect
  }, NoNotificationsSvg), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "No unread notifications")), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description));
};

export default NoNotitications;
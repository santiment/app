import React from 'react';
import { WebinarsImg } from '../images';
import styles from './WebinarWidgetTitle.module.css';

const WebinarWidgetTitle = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, WebinarsImg, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Video Insights"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Check out our recent webinars and weekly streams"))));
};

export default WebinarWidgetTitle;
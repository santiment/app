import React from 'react';
import { GetStartedImg } from '../Cabinet/images';
import styles from './QuickStartTitle.module.css';

const QuickStartTitle = ({
  max,
  currentCount
}) => {
  const percent = 100 * currentCount / max;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, GetStartedImg, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Get to know Sanbase"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "We\u2019re here to help you get things rolling"))), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement("div", null, currentCount, "/", max, " done ", /*#__PURE__*/React.createElement("span", {
    className: styles.highline
  }, "(", percent, "%)")), /*#__PURE__*/React.createElement("div", {
    className: styles.line
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filled,
    style: {
      transform: `translateX(-${100 - percent}%)`
    }
  }))));
};

export default QuickStartTitle;
import React from 'react';
import styles from './ScreenerChartTitle.module.css';

const ScreenerChartTitle = ({
  type,
  title
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.type
  }, type, ":"), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title));
};

export default ScreenerChartTitle;
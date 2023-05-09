import React from 'react';
import styles from './NoDataCharts.module.css';

const NoDataCharts = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, "There is no data for your request, please", /*#__PURE__*/React.createElement("br", null), "update or reset the filter");
};

export default NoDataCharts;
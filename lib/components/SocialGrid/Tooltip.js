import React from 'react';
import { getDateDayMonthYear } from '../../ducks/Chart/utils';
import styles from './Tooltip.module.css';

const Tooltip = ({
  point,
  datetime
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("div", {
  className: styles.top
}, /*#__PURE__*/React.createElement("span", {
  className: styles.point
}, point)), /*#__PURE__*/React.createElement("div", {
  className: styles.datetime
}, getDateDayMonthYear(datetime)));

export default Tooltip;
import React from 'react';
import cx from 'classnames';
import styles from './DetailsItem.module.css';

const DetailsItem = ({
  title = 'Total',
  value,
  percent = 100,
  className,
  color = '#FFAD4D'
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, /*#__PURE__*/React.createElement("h3", {
  className: styles.text
}, /*#__PURE__*/React.createElement("b", {
  className: styles.title
}, title), title === 'Total' && ' Social Volume'), /*#__PURE__*/React.createElement("div", {
  className: styles.numbers
}, /*#__PURE__*/React.createElement("span", {
  className: styles.value,
  style: {
    color: color
  }
}, value), /*#__PURE__*/React.createElement("span", {
  className: styles.percentage
}, percent, "%")));

export default DetailsItem;
import React from 'react';
import { READABLE_NAMES } from '../hooks';
import styles from './Labels.module.css';

const CardLabels = ({
  labels
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.labels
}, labels.map(label => /*#__PURE__*/React.createElement("div", {
  key: label,
  className: styles.label
}, READABLE_NAMES[label] || label)));

export default CardLabels;
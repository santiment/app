import React from 'react';
import { getSelectedAssetMetricCardDescription } from '../../../../../../utils';
import styles from './SelectedMetric.module.css';

const SelectedMetric = ({
  metric,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("div", {
  className: styles.title
}, metric.label), /*#__PURE__*/React.createElement("div", {
  className: styles.description
}, getSelectedAssetMetricCardDescription(metric)));

export default SelectedMetric;
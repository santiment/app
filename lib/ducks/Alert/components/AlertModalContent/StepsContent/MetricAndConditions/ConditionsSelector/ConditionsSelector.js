import React from 'react';
import TimeWindowSelector from './TimeWindowSelector/TimeWindowSelector';
import OperationSelector from './OperationSelector/OperationSelector';
import ChartPreview from './ChartPreview/ChartPreview';
import styles from './ConditionsSelector.module.css';

const ConditionsSelector = ({
  metric,
  isWallet
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("div", {
  className: styles.selectors
}, /*#__PURE__*/React.createElement(OperationSelector, {
  metric: metric,
  isWallet: isWallet
}), /*#__PURE__*/React.createElement(TimeWindowSelector, null)), /*#__PURE__*/React.createElement(ChartPreview, {
  metric: metric,
  isWallet: isWallet
}));

export default ConditionsSelector;
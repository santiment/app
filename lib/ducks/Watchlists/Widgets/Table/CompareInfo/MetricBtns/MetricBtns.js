import React from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import styles from './MetricBtns.module.css';

const MetricBtns = ({
  metrics,
  onClear,
  removeMetric
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, metrics.map(metric => {
    const {
      label
    } = metric;
    return /*#__PURE__*/React.createElement(Button, {
      border: true,
      key: label,
      className: styles.btn
    }, label, /*#__PURE__*/React.createElement(Icon, {
      type: "close-small",
      className: styles.closeIcon,
      onClick: () => removeMetric(metric)
    }));
  }), metrics.length > 0 && /*#__PURE__*/React.createElement(Button, {
    onClick: onClear,
    border: true,
    accent: "negative",
    className: styles.clearBtn
  }, "Clear selected"));
};

export default MetricBtns;
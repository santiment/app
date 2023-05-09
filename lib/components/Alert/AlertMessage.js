import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import styles from './AlertMessage.module.css';

const AlertMessage = ({
  text,
  warning,
  error,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.alert, warning && styles.warning, error && styles.error, className)
  }, warning && /*#__PURE__*/React.createElement(Icon, {
    className: styles.warningIcon,
    type: "alert"
  }), error && /*#__PURE__*/React.createElement(Icon, {
    className: styles.errorIcon,
    type: "error"
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.text
  }, text));
};

export default AlertMessage;
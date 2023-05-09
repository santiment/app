import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import styles from './Trigger.module.css';

const Trigger = ({
  isMonitored
}) => /*#__PURE__*/React.createElement(Button, {
  border: false,
  className: cx(styles.trigger, isMonitored && styles.trigger__active)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "report",
  className: styles.icon
}), isMonitored && /*#__PURE__*/React.createElement("span", {
  className: styles.active
}), !isMonitored && /*#__PURE__*/React.createElement("span", {
  className: styles.text
}, "Enable report"));

export default Trigger;
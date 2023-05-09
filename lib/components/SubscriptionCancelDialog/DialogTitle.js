import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import styles from './DialogTitle.module.css';

const DialogTitle = ({
  screen,
  onClick
}) => screen === 0 ? 'Subscription cancelling' : /*#__PURE__*/React.createElement("div", {
  className: styles.back,
  onClick: onClick
}, /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-left-big",
  className: styles.icon
}), "Cancel");

export default DialogTitle;
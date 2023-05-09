import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip';
import styles from './index.module.css';

const ResetButton = ({
  onClick
}) => {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    className: styles.reset
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    position: "top",
    align: "center",
    on: "hover",
    onClick: onClick,
    trigger: /*#__PURE__*/React.createElement(Icon, {
      type: "history-clear"
    })
  }, "Reset to default state"));
};

export default ResetButton;
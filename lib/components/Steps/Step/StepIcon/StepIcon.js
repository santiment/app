import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import styles from '../Step.module.css';

function StepIcon({
  icons,
  status,
  disabled,
  stepNumber
}) {
  let children = /*#__PURE__*/React.createElement("div", {
    className: styles.icon
  }, stepNumber);

  if (icons && icons.process && status === 'process') {
    children = icons.process;
  } else if (status === 'finish' && !disabled) {
    children = /*#__PURE__*/React.createElement(Icon, {
      type: "checkmark",
      className: styles.icon
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.iconWrapper
  }, children);
}

export default StepIcon;
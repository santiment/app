import React from 'react';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import styles from './index.module.css';

const IndeterminateCheckbox = ({
  title,
  onChange,
  checked
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.checkbox,
    onClick: onChange
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: checked
  }));
};

export default IndeterminateCheckbox;
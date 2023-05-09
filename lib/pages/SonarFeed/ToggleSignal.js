import React from 'react';
import { Toggle } from '@santiment-network/ui';
import styles from './SignalDetails.module.css';
export const ToggleSignal = ({
  isActive,
  toggleSignal,
  id
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.toggleSignal
}, /*#__PURE__*/React.createElement("span", null, "Signal ", isActive ? 'enabled' : 'disabled'), /*#__PURE__*/React.createElement(Toggle, {
  onClick: () => toggleSignal({
    id,
    isActive
  }),
  isActive: isActive
}));
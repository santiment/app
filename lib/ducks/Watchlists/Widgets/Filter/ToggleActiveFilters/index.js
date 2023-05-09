import React from 'react';
import Toggle from '@santiment-network/ui/Toggle';
import styles from './index.module.css';

const ToggleActiveFilters = ({
  isActive,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper,
  onClick: onClick
}, /*#__PURE__*/React.createElement(Toggle, {
  isActive: isActive,
  className: styles.toggle
}), /*#__PURE__*/React.createElement("span", {
  className: styles.text
}, "Show active filters only"));

export default ToggleActiveFilters;
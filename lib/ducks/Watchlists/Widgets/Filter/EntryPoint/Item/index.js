import React from 'react';
import cx from 'classnames';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import styles from './index.module.css';

const Item = ({
  name,
  ticker,
  className,
  isActive,
  onClick,
  isDisabled
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.item, className, isDisabled && styles.disabled),
    onClick: () => isDisabled ? null : onClick()
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: isActive,
    disabled: isDisabled
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.name
  }, name), ticker && /*#__PURE__*/React.createElement("span", {
    className: styles.ticker
  }, ticker));
};

export default Item;
import React from 'react';
import { formatNumber } from '../../../utils/formatting';
import styles from './IcoPriceTooltip.module.css';

const IcoPriceTooltip = ({
  value,
  y
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    style: {
      '--y': `${y < 20 ? y + 20 : y}px`
    }
  }, /*#__PURE__*/React.createElement("span", null, "ICO price"), /*#__PURE__*/React.createElement("span", {
    className: styles.value
  }, formatNumber(value, {
    currency: 'USD'
  })));
};

export default IcoPriceTooltip;
import React from 'react';
import { tooltipValueFormatter } from '../../dataHub/metrics/formatters';
import styles from './MobilePriceTooltip.module.css';

const MobilePriceTooltip = ({
  active,
  payload = [],
  labelFormatter,
  label
}) => {
  if (!payload) {
    return null;
  }

  const pricePayload = payload.find(({
    dataKey
  }) => dataKey === 'price_usd');
  const {
    value,
    formatter,
    dataKey
  } = pricePayload || {};
  return active && /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.price
  }, value ? tooltipValueFormatter({
    value,
    key: dataKey,
    formatter
  }) : ''), /*#__PURE__*/React.createElement("span", {
    className: styles.date
  }, labelFormatter(label)));
};

export default MobilePriceTooltip;
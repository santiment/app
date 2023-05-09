import React from 'react';
import cx from 'classnames';
import { formatNumber, millify } from '../../utils/formatting';
import { getDateFormats, getTimeFormats } from '../../utils/dates';
import styles from './CustomTooltip.module.css';
const LARGE_NUMBER_STEP = 1000;
export const tooltipLabelFormatter = time => {
  const date = new Date(time);
  const {
    YYYY,
    MMM,
    DD
  } = getDateFormats(date);
  const {
    HH,
    mm
  } = getTimeFormats(date);
  return `${HH}:${mm}, ${MMM} ${DD}, ${YYYY}`;
};

const isPrice = name => name && name.contains && name.contains('price_usd');

const getShortMetricName = name => {
  if (name === 'Daily Active Addresses') return 'DAA';
  if (name === 'Development Activity') return 'Dev.act';
  if (name === 'Social Volume') return 'Soc.vol';

  if (isPrice(name)) {
    return 'Price';
  }

  return name;
};

export const formatTooltipValue = (isPrice, value) => isPrice ? formatNumber(value, {
  currency: 'USD'
}) : value > LARGE_NUMBER_STEP ? millify(value) : formatNumber(value);

const CustomTooltip = ({
  active,
  payload,
  label,
  classes = {}
}) => {
  if (active && payload) {
    return /*#__PURE__*/React.createElement("div", {
      className: cx('custom-tooltip', styles.tooltip)
    }, payload[0] && /*#__PURE__*/React.createElement("span", {
      className: cx(styles.tooltipLabel, classes.tooltipLabel)
    }, tooltipLabelFormatter(label)), /*#__PURE__*/React.createElement("div", null, payload.map(({
      name,
      value,
      stroke,
      fill
    }) => {
      return /*#__PURE__*/React.createElement("span", {
        key: name,
        className: cx('label', styles.tooltipLabel, classes.tooltipLabel),
        style: {
          color: stroke || fill
        }
      }, `${getShortMetricName(name)} ${formatTooltipValue(name === 'Price' || isPrice(name), value)}`);
    })));
  }

  return '';
};

export default CustomTooltip;
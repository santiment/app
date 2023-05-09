import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Range from '../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range';
import styles from './IntervalsComponent.module.css';
export const RANGES = [{
  value: '1d',
  label: '24h'
}, {
  value: '7d',
  label: '7d'
}, {
  value: '30d',
  label: '1m'
}, {
  value: '183d',
  label: '6m'
}, {
  value: '1y',
  label: '1y'
}];

const IntervalsComponent = ({
  className,
  onChange = () => {},
  defaultIndex = 0,
  ranges = RANGES,
  btnClassName
}) => {
  const [sortedByIndex, setSortedByIndex] = useState(defaultIndex);
  const {
    value,
    label
  } = ranges[sortedByIndex];
  useEffect(() => {
    onChange(value);
  }, [value]);
  return /*#__PURE__*/React.createElement(Range, {
    className: cx(styles.range, className),
    range: label,
    changeRange: () => {
      setSortedByIndex((sortedByIndex + 1) % ranges.length);
    },
    btnClassName: btnClassName
  });
};

export default IntervalsComponent;
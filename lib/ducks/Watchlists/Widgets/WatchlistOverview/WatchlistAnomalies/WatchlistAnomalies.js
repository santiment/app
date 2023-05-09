import React, { useMemo } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { filteringTypes } from '../constants';
import Range from './Range';
import Stat from './Stat';
import styles from './WatchlistAnomalies.module.css';

const WatchlistAnomalies = ({
  assetsAmount,
  range: {
    value
  },
  changeRange,
  trends = [],
  onFilterAssets,
  type,
  toggleOpenAnomalies,
  isOpen,
  isDesktop = true
}) => {
  const isTrendsFilter = type === filteringTypes.TRENDS;
  const totalAnomalies = useMemo(() => {
    return new Set(trends.map(({
      id
    }) => id));
  }, [trends]);
  return trends.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.layout
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top,
    onClick: isDesktop ? null : toggleOpenAnomalies
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "flash-filled",
    className: styles.icon
  }), isDesktop || isOpen ? /*#__PURE__*/React.createElement(Range, {
    className: styles.range,
    label: "Anomalies",
    range: value,
    changeRange: event => {
      event.stopPropagation();
      changeRange();
    }
  }) : /*#__PURE__*/React.createElement(Stat, {
    name: `Anomalies, ${value}:`,
    values: [`${totalAnomalies.size} asset${totalAnomalies.size > 1 ? 's' : ''} / ${assetsAmount}`]
  }), !isDesktop && /*#__PURE__*/React.createElement(Icon, {
    type: `arrow-${isOpen ? 'up' : 'down'}`,
    className: styles.arrow
  })), (isDesktop || isOpen) && /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    border: true,
    className: cx(styles.button, isTrendsFilter && styles.active),
    onClick: () => onFilterAssets && onFilterAssets(trends, filteringTypes.TRENDS)
  }, /*#__PURE__*/React.createElement(Stat, {
    name: "Trending assets:",
    values: [trends.length],
    className: isTrendsFilter && styles.stat
  })))), !isDesktop && type && /*#__PURE__*/React.createElement("div", {
    className: styles.filterDescription
  }, "Showed based on ", type, " anomalies")) : null;
};

export default WatchlistAnomalies;
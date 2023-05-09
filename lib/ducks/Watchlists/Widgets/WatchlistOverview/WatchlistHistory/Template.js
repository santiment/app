import React from 'react';
import Range from '../WatchlistAnomalies/Range';
import PercentChanges from '../../../../../components/PercentChanges';
import { Skeleton } from '../../../../../components/Skeleton';
import MiniChart from '../../../../../components/MiniChart';
import styles from './Template.module.css';

const Template = ({
  data,
  label,
  metric,
  change,
  value,
  period,
  loading,
  changeRange
}) => {
  if (loading) {
    return /*#__PURE__*/React.createElement(Skeleton, {
      className: styles.skeleton,
      show: true
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Range, {
    label: `${label}, ${period}`
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.value
  }, "$ ", value), /*#__PURE__*/React.createElement(PercentChanges, {
    changes: change,
    className: styles.change
  }))), /*#__PURE__*/React.createElement(MiniChart, {
    className: styles.chart,
    valueKey: metric,
    data: data,
    change: change,
    width: 150
  }));
};

export default Template;
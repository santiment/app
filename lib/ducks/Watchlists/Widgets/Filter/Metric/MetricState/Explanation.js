import React from 'react';
import { Filter } from '../../dataHub/types';
import { millify } from '../../../../../../utils/formatting';
import styles from './index.module.css';

const Explanation = ({
  isFinishedState,
  firstThreshold,
  secondThreshold,
  timeRange,
  type,
  metric,
  customStateText
}) => {
  if (customStateText) {
    return /*#__PURE__*/React.createElement("span", {
      className: styles.explanation
    }, customStateText);
  }

  if (!isFinishedState) {
    return null;
  }

  let label = Filter[type].shortLabel || Filter[type].label;
  label = label.toLowerCase();
  const aggregation = metric.aggregation ? `(${metric.aggregation}) ` : '';
  const badge = Filter[type].badge || metric.badge || '';
  const timeText = Filter[type].showTimeRange ? ` compared to ${timeRange} earlier` : metric.showTimeRange ? ` in last ${timeRange}` : '';
  const secondInput = Filter[type].showSecondInput ? ` and ${millify(secondThreshold, 10)}${badge}` : '';
  return /*#__PURE__*/React.createElement("span", {
    className: styles.explanation
  }, `${aggregation}${label} ${millify(firstThreshold, 10)}${badge}${secondInput}${timeText}`);
};

export default Explanation;
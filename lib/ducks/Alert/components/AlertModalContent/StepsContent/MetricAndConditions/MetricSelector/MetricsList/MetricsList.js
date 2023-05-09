import React, { useMemo } from 'react';
import SelectedMetric from '../SelectedMetric/SelectedMetric';
import MetricCategory from './MetricCategory/MetricCategory';
import styles from './MetricsList.module.css';

const MetricsList = ({
  metricsList,
  project,
  onSelect,
  selectedMetric
}) => {
  const listKeys = useMemo(() => Object.keys(metricsList), [metricsList]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, selectedMetric && /*#__PURE__*/React.createElement(SelectedMetric, {
    metric: selectedMetric
  }), listKeys.map(category => /*#__PURE__*/React.createElement(MetricCategory, {
    defaultOpen: category === listKeys[0],
    key: category,
    category: category,
    metricsList: metricsList,
    project: project,
    onSelect: onSelect
  })));
};

export default MetricsList;
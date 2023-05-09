import React from 'react';
import Sidepanel from '../Chart/Sidepanel';
import styles from './Widgets.module.css';
const MetricColor = {};

const MetricExplanation = ({
  widgets,
  toggleMetricExplanationVisibility
}) => /*#__PURE__*/React.createElement(Sidepanel, {
  className: styles.side,
  chartSidepane: "METRICS_EXPLANATION_PANE",
  metrics: widgets.reduce((acc, widget) => [...acc, ...widget.metrics], []),
  MetricColor: MetricColor,
  toggleChartSidepane: toggleMetricExplanationVisibility
});

export default MetricExplanation;
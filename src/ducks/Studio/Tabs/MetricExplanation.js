import React from 'react'
import Sidepanel from '../Chart/Sidepanel'
import styles from './Widgets.module.scss'

const MetricColor = {}

const MetricExplanation = ({ widgets, toggleMetricExplanationVisibility }) => {
  return (
    <Sidepanel
      className={styles.side}
      chartSidepane='METRICS_EXPLANATION_PANE'
      metrics={widgets.reduce((acc, widget) => [...acc, ...widget.metrics], [])}
      MetricColor={MetricColor}
      // setMetrics={() => {}}
      toggleChartSidepane={toggleMetricExplanationVisibility}
    />
  )
}

export default MetricExplanation

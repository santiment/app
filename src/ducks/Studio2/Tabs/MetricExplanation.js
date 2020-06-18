import React from 'react'
import Sidepane from '../../Studio/Chart/Sidepane'
import styles from '../index.module.scss'

const MetricExplanation = ({
  widgets,
  toggleMetricExplanationVisibility,
  ...props
}) => {
  return (
    <Sidepane
      className={styles.side}
      chartSidepane='METRICS_EXPLANATION_PANE'
      metrics={widgets.reduce((acc, widget) => [...acc, ...widget.metrics], [])}
      MetricColor={{}}
      //setMetrics={() => {}}
      toggleChartSidepane={toggleMetricExplanationVisibility}
    />
  )
}

export default MetricExplanation

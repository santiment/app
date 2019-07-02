import React from 'react'
import ChartMetricSelector from './ChartMetricSelector'
import ChartActiveMetrics from './ChartActiveMetrics'

const ChartMetricsTool = ({
  classes = {},
  activeMetrics,
  disabledMetrics,
  slug,
  toggleMetric
}) => (
  <>
    <ChartActiveMetrics
      activeMetrics={activeMetrics}
      toggleMetric={toggleMetric}
    />
    <ChartMetricSelector
      className={classes.selector}
      slug={slug}
      toggleMetric={toggleMetric}
      disabledMetrics={disabledMetrics}
      activeMetrics={activeMetrics}
    />
  </>
)

export default ChartMetricsTool

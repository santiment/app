import React, { useState, useEffect } from 'react'
import MetricsSelector from './Metrics/Selector'

const Studio = () => {
  const [activeMetrics, setActiveMetrics] = useState([])

  useEffect(
    () => {
      console.log({ activeMetrics })
    },
    [activeMetrics]
  )

  function toggleMetric (metric) {
    const metricSet = new Set(activeMetrics)
    if (metricSet.has(metric)) {
      metricSet.delete(metric)
    } else {
      metricSet.add(metric)
    }
    setActiveMetrics([...metricSet])
  }

  return (
    <MetricsSelector
      activeMetrics={activeMetrics}
      toggleMetric={toggleMetric}
      activeMetrics={activeMetrics}
    />
  )
}

export default Studio

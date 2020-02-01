import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

const Studio = () => {
  const [options, setOptions] = useState({})
  const [activeMetrics, setActiveMetrics] = useState([])

  useEffect(
    () => {
      console.log(options)
    },
    [options]
  )

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
    <Sidebar
      options={options}
      setOptions={setOptions}
      toggleMetric={toggleMetric}
      activeMetrics={activeMetrics}
    />
  )
}

export default Studio

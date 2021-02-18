import React from 'react'
import { CanvasBase } from '../Canvas'
import { useTimeseries } from '../../../Studio/timeseries/hooks'
import { useMetricCategories } from '../../../Chart/Synchronizer'

const DetailedChart = ({ MetricSettingMap, ...props }) => {
  const { metrics, settings } = props
  const [data] = useTimeseries(metrics, settings, MetricSettingMap)
  const categories = useMetricCategories(metrics)

  return <CanvasBase {...props} categories={categories} data={data} />
}

export default DetailedChart

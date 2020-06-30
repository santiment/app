import React from 'react'
import Chart from '../../../Chart'
import { useTimeseries } from '../../../Studio/timeseries/hooks'
import { metricsToPlotCategories } from '../../../Chart/Synchronizer'
import { useAxesMetricsKey } from '../../../Chart/hooks'

const CHART_HEIGHT = 270

const DetailedChart = ({ charts, settings, MetricSettingMap, ...props }) => {
  const [data] = useTimeseries(charts, settings, MetricSettingMap)
  const categories = metricsToPlotCategories(charts)
  const axesMetricKeys = useAxesMetricsKey(charts)

  return (
    <Chart
      {...props}
      {...settings}
      {...categories}
      hideBrush
      chartHeight={CHART_HEIGHT}
      data={data}
      resizeDependencies={[]}
      axesMetricKeys={axesMetricKeys}
    />
  )
}

export default DetailedChart

import React from 'react'
import Chart from '../../../Chart'
import { useTimeseries } from '../../../Studio/timeseries/hooks'
import { metricsToPlotCategories } from '../../../Chart/Synchronizer'

const CHART_HEIGHT = 270

const DetailedChart = ({ charts, settings, MetricSettingMap, ...props }) => {
  const [data] = useTimeseries(charts, settings, MetricSettingMap)
  const categories = metricsToPlotCategories(charts)
  console.log(charts, MetricSettingMap)

  return (
    <Chart
      {...props}
      {...settings}
      {...categories}
      hideBrush
      chartHeight={CHART_HEIGHT}
      data={data}
      resizeDependencies={[]}
    />
  )
}

export default DetailedChart

import React from 'react'
import Chart from '../../ducks/Chart'
import { SETTINGS } from './topics'
import { Metric } from '../../ducks/dataHub/metrics'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { metricsToPlotCategories } from '../../ducks/Chart/Synchronizer'

const CHART_HEIGHT = 150

const SmallChart = ({ topic, ...props }) => {
  const charts = [Metric.social_volume_total]
  let MetricSettingMap = new Map()

  MetricSettingMap.set(Metric.social_volume_total, {
    selector: 'text',
    slug: topic
  })

  const [data] = useTimeseries(charts, SETTINGS, MetricSettingMap)
  const categories = metricsToPlotCategories(charts)

  return (
    <Chart
      {...props}
      {...SETTINGS}
      {...categories}
      hideBrush
      tooltipKey={Metric.social_volume_total.key}
      chartHeight={CHART_HEIGHT}
      data={data}
      resizeDependencies={[]}
    />
  )
}

export default SmallChart

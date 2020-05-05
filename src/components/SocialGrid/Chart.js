import React from 'react'
import Chart from '../../ducks/Chart'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { metricsToPlotCategories } from '../../ducks/Chart/Synchronizer'

const CHART_HEIGHT = 150

const SmallChart = ({ topic, charts, settings, settingMap, ...props }) => {
  const [data] = useTimeseries(charts, settings, settingMap)
  const categories = metricsToPlotCategories(charts)

  return (
    <Chart
      {...props}
      {...settings}
      {...categories}
      hideBrush
      MetricColor={{ social_volume_total: '#68DBF4' }}
      tooltipKey='social_volume_total'
      chartHeight={CHART_HEIGHT}
      data={data}
      resizeDependencies={[]}
    />
  )
}

export default SmallChart

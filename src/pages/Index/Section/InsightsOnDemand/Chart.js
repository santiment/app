import React from 'react'
import Canvas from '../../../../ducks/Chart/Modular'
import Areas from '../../../../ducks/Chart/Areas'
import Lines from '../../../../ducks/Chart/Lines'
import Bars from '../../../../ducks/Chart/Bars'
import Tooltip from '../../../../ducks/Chart/Tooltip'
import { useMetricCategories } from '../../../../ducks/Chart/Synchronizer'
import { useChartColors } from '../../../../ducks/Chart/colors'
import { useTimeseries } from '../../../../ducks/Studio/timeseries/hooks'

const PADDING = {
  left: 3,
  right: 3,
  top: 20,
  bottom: 3
}

const Chart = ({ metrics, settings, MetricColor }) => {
  const [data] = useTimeseries(metrics, settings)
  const categories = useMetricCategories(metrics)
  const colors = useChartColors(metrics, MetricColor)

  return (
    <Canvas
      padding={PADDING}
      height={405}
      data={data}
      colors={colors}
      categories={categories}
    >
      <Bars />
      <Areas />
      <Lines />
      <Tooltip metric={metrics[0].key} />
    </Canvas>
  )
}

export default Chart

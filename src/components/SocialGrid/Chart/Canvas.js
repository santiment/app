import React from 'react'
import Tooltip from './Tooltip'
import SANChart from '../../../ducks/Chart/Modular'
import Bars from '../../../ducks/Chart/Bars'
import Signals from '../../../ducks/Chart/Signals'
import { useMetricCategories } from '../../../ducks/Chart/Synchronizer'

const CHART_HEIGHT = 150
const CHART_COLORS = { social_volume_total: '#68DBF4' }
const CHART_PADDING = {
  top: 5,
  right: 16,
  bottom: 5,
  left: 16
}

const Canvas = ({
  data,
  metrics,
  topic,
  settings,
  setCurrentPoint,
  ...props
}) => {
  const categories = useMetricCategories(metrics)

  return (
    <SANChart
      {...props}
      data={data}
      height={CHART_HEIGHT}
      padding={CHART_PADDING}
      colors={CHART_COLORS}
      categories={categories}
    >
      <Bars />
      <Tooltip />
      <Signals
        {...settings}
        data={data}
        useShortRecord
        metrics={metrics}
        selector='text'
        slug={topic}
      />
    </SANChart>
  )
}

export default Canvas

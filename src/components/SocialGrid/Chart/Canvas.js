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
}) => (
  <SANChart
    {...props}
    data={data}
    height={CHART_HEIGHT}
    padding={CHART_PADDING}
    colors={CHART_COLORS}
    categories={useMetricCategories(metrics)}
  >
    <Bars />
    <Tooltip setCurrentPoint={setCurrentPoint} />
    <Signals
      {...settings}
      useShortRecord
      selector='text'
      width={13}
      data={data}
      metrics={metrics}
      slug={topic}
    />
  </SANChart>
)

export default Canvas

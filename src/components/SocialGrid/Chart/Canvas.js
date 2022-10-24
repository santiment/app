import React from 'react'
import Tooltip from './Tooltip'
import SANChart from '../../../ducks/Chart/Modular'
import Lines from '../../../ducks/Chart/Lines'
import Bars from '../../../ducks/Chart/Bars'
import Signals from '../../../ducks/Chart/Signals'
import { useMetricCategories } from '../../../ducks/Chart/Synchronizer'

const CHART_HEIGHT = 150
const CHART_COMPACT_HEIGHT = 112
const CHART_COLORS = { social_volume_total: '#68DBF4', price_usd: '#26C953' }
const CHART_PADDING = {
  top: 5,
  right: 16,
  bottom: 5,
  left: 16,
}
const CHART_COMPACT_PADDING = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const Canvas = ({ data, metrics, topic, settings, setCurrentPoint, isCompact, ...props }) => (
  <SANChart
    {...props}
    data={data}
    height={isCompact ? CHART_COMPACT_HEIGHT : CHART_HEIGHT}
    padding={isCompact ? CHART_COMPACT_PADDING : CHART_PADDING}
    colors={CHART_COLORS}
    categories={useMetricCategories(metrics)}
  >
    <Bars />
    {!isCompact && (
      <>
        <Lines />
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
      </>
    )}
  </SANChart>
)

export default Canvas

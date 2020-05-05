import React, { useState } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import Chart from '../../ducks/Chart'
import Signals from '../../ducks/Chart/Signals'
import { metricsToPlotCategories } from '../../ducks/Chart/Synchronizer'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import Tooltip from './Tooltip'
import styles from './index.module.scss'

const CHART_HEIGHT = 150

const CHART_PADDING = {
  top: 13,
  right: 0,
  bottom: 0,
  left: 16
}

const SmallChart = ({ topic, charts, settings, settingMap, ...props }) => {
  const [currentPoint, setCurrentPoint] = useState()
  const [data, loadings] = useTimeseries(charts, settings, settingMap)
  const categories = metricsToPlotCategories(charts)

  const latestPoint = data[data.length - 1]

  return loadings.length > 0 ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      {latestPoint && (
        <Tooltip currentPoint={currentPoint} latestPoint={latestPoint} />
      )}
      <Chart
        {...props}
        {...settings}
        {...categories}
        hideBrush
        hideAxes
        hideWatermark
        useCustomTooltip
        onPlotTooltip={data => setCurrentPoint(data)}
        MetricColor={{ social_volume_total: '#68DBF4' }}
        tooltipKey='social_volume_total'
        chartHeight={CHART_HEIGHT}
        chartPadding={CHART_PADDING}
        data={data}
        resizeDependencies={[]}
      >
        <Signals
          useShortRecord
          {...settings}
          metrics={charts}
          selector='text'
        />
      </Chart>
    </>
  )
}

export default SmallChart

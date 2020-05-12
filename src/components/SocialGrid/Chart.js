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
  top: 5,
  right: 0,
  bottom: 5,
  left: 16
}

const SmallChart = ({
  charts,
  settingMap,
  settings,
  topic,
  onLoad,
  ...props
}) => {
  const [currentPoint, setCurrentPoint] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [data, loadings] = useTimeseries(charts, settings, settingMap)
  const categories = metricsToPlotCategories(charts)

  if (data.length !== 0 && loadings.length === 0 && isLoading) {
    onLoad()
    setIsLoading(false)
  }

  return loadings.length > 0 ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      {currentPoint && <Tooltip {...currentPoint} />}
      <Chart
        {...props}
        {...settings}
        {...categories}
        hideBrush
        hideAxes
        hideWatermark
        useCustomTooltip
        onPlotTooltip={data =>
          setCurrentPoint(
            data
              ? { point: data.social_volume_total.value, datetime: data.value }
              : null
          )
        }
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
          slug={topic}
        />
      </Chart>
    </>
  )
}

export default SmallChart

import React from 'react'
import { useAxesMetricsKey } from '../../../../ducks/Chart/hooks'
import Canvas from '../../../../ducks/Chart/Modular'
import Areas from '../../../../ducks/Chart/Areas'
import Lines from '../../../../ducks/Chart/Lines'
import Bars from '../../../../ducks/Chart/Bars'
import Tooltip from '../../../../ducks/Chart/Tooltip'
import { useMetricCategories } from '../../../../ducks/Chart/Synchronizer'
import { useChartColors } from '../../../../ducks/Chart/colors'
import { useTimeseries } from '../../../../ducks/Studio/timeseries/hooks'
import styles from './index.module.scss'

const PADDING = {
  left: 3,
  right: 3,
  top: 20,
  bottom: 3,
}

const Chart = ({ metrics, settings, MetricColor }) => {
  const [data] = useTimeseries(metrics, settings)
  const categories = useMetricCategories(metrics)
  const colors = useChartColors(metrics, MetricColor)
  const axesMetricKeys = useAxesMetricsKey(metrics)

  return (
    <Canvas
      className={styles.chart}
      padding={PADDING}
      height={176}
      data={data}
      colors={colors}
      categories={categories}
    >
      <Bars />
      <Areas />
      <Lines />
      <Tooltip metric={axesMetricKeys[0]} axesMetricKeys={axesMetricKeys} />
    </Canvas>
  )
}

export default Chart

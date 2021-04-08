import React, { useMemo } from 'react'
import VisualBacktestChart, {
  GetReferenceDots
} from '../../../../../ducks/Signals/chart/VisualBacktestChart'
import { Metric } from '../../../../../ducks/dataHub/metrics'
import { useTimeseries } from '../../../../../ducks/Studio/timeseries/hooks'
import { getMetricYAxisId } from '../../../../../ducks/SANCharts/utils'
import styles from './StakeholderChartPreview.module.scss'

function getNearestPricePoint (timeseries, datetime) {
  let target = timeseries[0]
  const time = new Date(datetime).getTime()

  for (let i = 0; i < timeseries.length; i++) {
    const current = timeseries[i]

    if (current.datetime >= time) {
      target = current
    } else {
      break
    }
  }

  return target
}

const StakeholderChartPreview = ({ data, project, settings }) => {
  const { datetime, value, slug } = data

  // const slug = 'ethereum'

  const { ticker } = project

  const metricSettings = useMemo(() => ({ ...settings, slug }), [
    settings,
    slug
  ])

  const metrics = useMemo(
    () => {
      return [
        {
          ...Metric.price_usd,
          label: `Price (${ticker})`
        }
      ]
    },
    [slug, ticker]
  )

  const [timeseries] = useTimeseries(metrics, metricSettings)

  const referenceDots = useMemo(
    () => {
      const nearestPoint = getNearestPricePoint(timeseries, datetime)

      console.log(nearestPoint)

      return timeseries && timeseries.length > 0
        ? GetReferenceDots([nearestPoint], getMetricYAxisId(Metric.price_usd))
        : []
    },
    [value, datetime, timeseries]
  )

  console.log(timeseries)

  return (
    <div className={styles.container}>
      <VisualBacktestChart
        data={timeseries}
        dataKeys={Metric.price_usd}
        metrics={metrics}
        referenceDots={referenceDots}
        classes={styles}
      />
    </div>
  )
}

export default StakeholderChartPreview

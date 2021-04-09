import React, { useMemo } from 'react'
import VisualBacktestChart, {
  GetReferenceDots
} from '../../../../../ducks/Signals/chart/VisualBacktestChart'
import { Metric } from '../../../../../ducks/dataHub/metrics'
import { useTimeseries } from '../../../../../ducks/Studio/timeseries/hooks'
import { getMetricYAxisId } from '../../../../../ducks/SANCharts/utils'
import styles from './StakeholderChartPreview.module.scss'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import { mapWithTimeseriesAndYCoord } from '../../../../../ducks/Signals/chart/preview/utils'

const PRICE_METRIC = {
  ...Metric.price_usd,
  historicalTriggersDataKey: undefined
}

function getNearestPricePoint (timeseries, datetime) {
  let target = timeseries[0]
  const time = new Date(datetime).getTime()

  for (let i = 0; i < timeseries.length; i++) {
    const current = timeseries[i]

    if (current.datetime < time) {
      target = current
    } else {
      break
    }
  }

  return target
}

const StakeholderChartPreview = ({ data, project, settings }) => {
  const { datetime, slug } = data

  const { ticker } = project

  const metricSettings = useMemo(() => ({ ...settings, slug }), [
    settings,
    slug
  ])

  const metrics = useMemo(
    () => {
      return [
        {
          ...PRICE_METRIC,
          label: `Price (${ticker})`
        }
      ]
    },
    [slug, ticker]
  )

  const [timeseries, loadings] = useTimeseries(metrics, metricSettings)

  const signals = useMemo(
    () => {
      const nearestPoint = getNearestPricePoint(timeseries, datetime)

      return nearestPoint
        ? mapWithTimeseriesAndYCoord(
          [nearestPoint],
          PRICE_METRIC,
          timeseries,
          false
        )
        : []
    },
    [timeseries, datetime]
  )

  const referenceDots = useMemo(
    () => {
      return signals.length > 0
        ? GetReferenceDots(signals, getMetricYAxisId(PRICE_METRIC))
        : []
    },
    [signals, timeseries]
  )

  const loading = loadings.length > 0

  return (
    <div className={styles.container}>
      {!loading && (
        <VisualBacktestChart
          data={timeseries}
          dataKeys={PRICE_METRIC}
          metrics={metrics}
          referenceDots={referenceDots}
          classes={styles}
          height={100}
        />
      )}
      {loading && (
        <Skeleton
          repeat={1}
          show={loading}
          className={styles.skeleton}
          wrapperClassName={styles.skeletonWrapper}
        />
      )}
    </div>
  )
}

export default StakeholderChartPreview

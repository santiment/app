import React, { useEffect } from 'react'
import { Query } from '@apollo/react-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  getNewMetricsByType,
  getOldMetricsByType,
  getSlugFromSignalTarget,
  getTimeRangeForChart,
  isNewTypeSignal,
  skipHistoricalPreview
} from '../../utils/utils'
import { Metric } from '../../../dataHub/metrics'
import { getMetricYAxisId } from '../../../SANCharts/utils'
import { getSyncedColors, clearCache } from '../../../Chart/Synchronizer'
import GetTimeSeries from '../../../GetTimeSeries/GetTimeSeries'
import VisualBacktestChart, { GetReferenceDots } from '../VisualBacktestChart'
import { HISTORICAL_TRIGGER_POINTS_QUERY } from '../../epics'
import {
  cleanByDatakeys,
  mapWithTimeseries,
  mapWithTimeseriesAndYCoord,
  mapToRequestedMetrics,
  makeSameRange
} from './utils'
import { DAILY_ACTIVE_ADDRESSES } from '../../utils/constants'
import styles from './SignalPreview.module.scss'

const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

const getAvailableCooldown = baseCooldown => {
  if (
    baseCooldown &&
    (baseCooldown.indexOf('d') !== -1 || baseCooldown.indexOf('w') !== -1)
  ) {
    return '1d'
  }

  return baseCooldown && baseCooldown.indexOf('m') !== -1 ? '1h' : baseCooldown
}

const SignalPreviewChart = ({
  target,
  type: oldSignalType,
  timeRange,
  label,
  points,
  showTitle,
  trigger
}) => {
  useEffect(() => clearCache, [])

  let triggeredSignals = points.filter(point => point['triggered?'])

  const isNew = isNewTypeSignal(trigger)

  const { metrics, triggersBy } = isNew
    ? getNewMetricsByType(trigger)
    : getOldMetricsByType(oldSignalType)

  const isStrongDaily = oldSignalType === DAILY_ACTIVE_ADDRESSES

  const { cooldown } = trigger

  const metricsInterval = isStrongDaily ? '1d' : getAvailableCooldown(cooldown)

  const { eth_address, address = eth_address } = target || {}

  const metricRest = {
    address
  }

  const slug = getSlugFromSignalTarget(trigger)

  if (!slug) {
    return null
  }

  const requestedMetrics = mapToRequestedMetrics(metrics, {
    timeRange,
    interval: metricsInterval,
    slug,
    ...metricRest
  })

  const metricsForSignalsChart = metrics.map(metric =>
    metric === Metric.price_usd ? Metric.historyPricePreview : metric
  )

  const syncedColors = getSyncedColors(metricsForSignalsChart)

  return (
    <GetTimeSeries
      metrics={requestedMetrics}
      render={({ timeseries }) => {
        if (!timeseries) {
          return PreviewLoader
        }

        const data = mapWithTimeseries(timeseries)
        const merged = cleanByDatakeys(
          data,
          triggersBy.dataKey || triggersBy.key
        )

        triggeredSignals = makeSameRange(triggeredSignals, merged)

        const signals = mapWithTimeseriesAndYCoord(
          triggeredSignals,
          triggersBy,
          merged,
          isStrongDaily
        )

        const referenceDots =
          triggeredSignals.length > 0 && triggersBy
            ? GetReferenceDots(signals, getMetricYAxisId(triggersBy))
            : null

        return (
          <VisualBacktestChart
            data={merged}
            dataKeys={triggersBy}
            label={label}
            triggeredSignals={triggeredSignals}
            metrics={metricsForSignalsChart}
            signals={signals}
            referenceDots={referenceDots}
            syncedColors={syncedColors}
            showTitle={showTitle}
          />
        )
      }}
    />
  )
}

const SignalPreview = ({
  type,
  trigger = {},
  showExpand = true,
  showTitle = true
}) => {
  const { settings: { target, asset } = {}, cooldown } = trigger

  if (!target && !asset) {
    return null
  }

  return (
    <Query
      query={HISTORICAL_TRIGGER_POINTS_QUERY}
      skip={skipHistoricalPreview(trigger)}
      variables={{
        cooldown: getAvailableCooldown(cooldown),
        settings: JSON.stringify(trigger.settings)
      }}
    >
      {({
        data: { historicalTriggerPoints: points = [], error, loading } = {}
      }) => {
        if (loading) {
          return PreviewLoader
        }

        const isError = error && (!points || points.length === 0)

        if (isError) {
          return (
            <div className={styles.loaderWrapper}>
              Something's gone wrong.
              <br />
              Backtesting chart is unavailable.
            </div>
          )
        }

        const { label, value: timeRange } = getTimeRangeForChart(type)

        return (
          <SignalPreviewChart
            type={type}
            label={label}
            timeRange={timeRange}
            points={points}
            showExpand={showExpand}
            showTitle={showTitle}
            target={target}
            trigger={trigger}
          />
        )
      }}
    </Query>
  )
}

export default SignalPreview

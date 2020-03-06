import React, { useEffect } from 'react'
import { Query } from '@apollo/react-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  getCheckingMetric,
  getNewMetricsByType,
  getOldMetricsByType,
  getTimeRangeForChart,
  isNewTypeSignal,
  mapTargetObject
} from '../../utils/utils'
import { Metrics } from '../../../SANCharts/data'
import { getMetricYAxisId } from '../../../SANCharts/utils'
import {
  getSyncedColors,
  clearCache
} from '../../../SANCharts/Chart/Synchronizer'
import GetTimeSeries from '../../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../../SANCharts/ChartPage'
import VisualBacktestChart, { GetReferenceDots } from '../VisualBacktestChart'
import { ChartExpandView } from '../ChartExpandView'
import { DesktopOnly } from '../../../../components/Responsive'
import { HISTORICAL_TRIGGER_POINTS_QUERY } from '../../epics'
import {
  cleanByDatakeys,
  mapWithTimeseries,
  mapWithTimeseriesAndYCoord,
  mapToRequestedMetrics,
  makeSameRange
} from './utils'
import { DAILY_ACTIVE_ADDRESSES, TRENDING_WORDS } from '../../utils/constants'
import styles from './SignalPreview.module.scss'

const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

const SignalPreviewChart = ({
  target,
  type: oldSignalType,
  slug,
  timeRange,
  label,
  points,
  showExpand,
  showTitle,
  trigger
}) => {
  let triggeredSignals = points.filter(point => point['triggered?'])
  const { metrics, triggersBy } = isNewTypeSignal(trigger)
    ? getOldMetricsByType(oldSignalType)
    : getNewMetricsByType(trigger)

  const isStrongDaily = oldSignalType === DAILY_ACTIVE_ADDRESSES
  const metricsInterval = isStrongDaily ? '1d' : '1h'

  const metricRest = {
    address: target && target.eth_address ? target.eth_address : ''
  }

  const requestedMetrics = mapToRequestedMetrics(metrics, {
    timeRange,
    interval: metricsInterval,
    slug,
    ...metricRest
  })

  const metricsForSignalsChart = metrics.map(metric =>
    metric === Metrics.price_usd ? Metrics.historyPricePreview : metric
  )

  const syncedColors = getSyncedColors(metricsForSignalsChart)

  useEffect(() => clearCache, [])

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

        console.log(triggersBy, signals)

        const referenceDots =
          triggeredSignals.length > 0 && triggersBy
            ? GetReferenceDots(signals, getMetricYAxisId(triggersBy))
            : null

        return (
          <>
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
            {showExpand && (
              <DesktopOnly>
                <ChartExpandView>
                  <ChartWidget
                    alwaysShowingMetrics={triggersBy ? [triggersBy.key] : []}
                    timeRange={timeRange}
                    slug={slug}
                    metrics={metrics}
                    interval='1d'
                    title={slug}
                    hideSettings={{
                      header: true,
                      sidecar: true
                    }}
                    adjustNightMode={false}
                    metricRest={metricRest}
                  >
                    {referenceDots}
                  </ChartWidget>
                </ChartExpandView>
              </DesktopOnly>
            )}
          </>
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

  const slug = mapTargetObject(asset || target)

  return (
    <Query
      query={HISTORICAL_TRIGGER_POINTS_QUERY}
      skip={getCheckingMetric(trigger.settings) === TRENDING_WORDS}
      variables={{
        cooldown: cooldown,
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
            slug={slug}
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

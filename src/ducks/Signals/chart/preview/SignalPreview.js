import React, { useEffect } from 'react'
import { Query } from '@apollo/react-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  getMetricsByType,
  getTimeRangeForChart,
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
  mapToRequestedMetrics
} from './utils'
import styles from './SignalPreview.module.scss'

const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

const SignalPreviewChart = ({
  target,
  type,
  slug,
  timeRange,
  label,
  points,
  showExpand,
  showTitle
}) => {
  const triggeredSignals = points.filter(point => point['triggered?'])
  const metricsTypes = getMetricsByType(type)
  const { metrics, triggersBy } = metricsTypes

  const metricRest = {
    address: target && target.eth_address ? target.eth_address : ''
  }

  const requestedMetrics = mapToRequestedMetrics(metrics, {
    timeRange,
    interval: '1d',
    slug,
    ...metricRest
  })

  const metricsForSignalsChart = metrics.map(metric =>
    metric === Metrics.historyPrice ? Metrics.historyPricePreview : metric
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
        const merged = cleanByDatakeys(data, triggersBy.dataKey)

        const signals = mapWithTimeseriesAndYCoord(
          triggeredSignals,
          triggersBy,
          merged
        )

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
  const { settings: { target, asset } = {} } = trigger

  if (!target && !asset) {
    return null
  }

  const slug = mapTargetObject(asset || target)

  return (
    <Query
      query={HISTORICAL_TRIGGER_POINTS_QUERY}
      variables={{
        cooldown: trigger.cooldown,
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
          />
        )
      }}
    </Query>
  )
}

export default SignalPreview

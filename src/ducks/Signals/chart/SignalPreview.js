import React, { useEffect } from 'react'
import { Query } from '@apollo/react-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  getMetricsByType,
  getTimeRangeForChart,
  mapTargetObject
} from '../utils/utils'
import { Metrics } from '../../SANCharts/data'
import { getMetricYAxisId, mapToRequestedMetrics } from '../../SANCharts/utils'
import {
  getSyncedColors,
  clearCache
} from '../../SANCharts/TooltipSynchronizer'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart, { GetReferenceDots } from './VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'
import { DesktopOnly } from './../../../components/Responsive'
import { HISTORICAL_TRIGGER_POINTS_QUERY } from '../epics'
import styles from './SignalPreview.module.scss'

const mapWithTimeseries = items =>
  items.map(item => ({
    ...item,
    datetime: +new Date(item.datetime),
    index: item.datetime
  }))

const mapWithMidnightTime = date => {
  const datetime = new Date(date)
  datetime.setUTCHours(0, 0, 0, 0)
  return +new Date(datetime)
}

const mapWithTimeseriesAndYCoord = (
  items,
  { key, dataKey, historicalTriggersDataKey = dataKey },
  data
) => {
  return items.map(point => {
    const date = mapWithMidnightTime(point.datetime)
    const item = data.find(({ datetime }) => datetime === date)

    const yCoord =
      item && item[dataKey] ? item[dataKey] : point[historicalTriggersDataKey]

    return { date, yCoord, ...point }
  })
}

const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

const SignalPreviewChart = ({
  type,
  slug,
  timeRange,
  label,
  triggeredSignals,
  showExpand
}) => {
  const metricsTypes = getMetricsByType(type)
  const { metrics, triggersBy } = metricsTypes
  const requestedMetrics = mapToRequestedMetrics(metrics, {
    timeRange,
    interval: '1d',
    slug
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

        const signals = mapWithTimeseriesAndYCoord(
          triggeredSignals,
          triggersBy,
          data
        )

        const referenceDots =
          triggeredSignals.length > 0 && triggersBy
            ? GetReferenceDots(signals, getMetricYAxisId(triggersBy))
            : null

        return (
          <>
            <VisualBacktestChart
              data={data}
              dataKeys={triggersBy}
              label={label}
              triggeredSignals={triggeredSignals}
              metrics={metricsForSignalsChart}
              signals={signals}
              referenceDots={referenceDots}
              syncedColors={syncedColors}
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

const SignalPreview = ({ type, trigger = {}, showExpand = true }) => {
  const {
    settings: { target }
  } = trigger

  const slug = mapTargetObject(target)

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
        const triggeredSignals = points.filter(point => point['triggered?'])

        return (
          <SignalPreviewChart
            type={type}
            slug={slug}
            label={label}
            timeRange={timeRange}
            triggeredSignals={triggeredSignals}
            showExpand={showExpand}
          />
        )
      }}
    </Query>
  )
}

export default SignalPreview

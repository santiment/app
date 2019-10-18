import React from 'react'
import { connect } from 'react-redux'
import Loader from '@santiment-network/ui/Loader/Loader'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/data'
import {
  getMetricYAxisId,
  mapToRequestedMetrics,
} from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart, { GetReferenceDots } from './VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'
import { DesktopOnly } from './../../../components/Responsive'
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

    const yCoord = item ? item[dataKey] : point[historicalTriggersDataKey]

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
  triggeredSignals
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
            />
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
                >
                  {referenceDots}
                </ChartWidget>
              </ChartExpandView>
            </DesktopOnly>
          </>
        )
      }}
    />
  )
}

const SignalPreview = ({
  isError,
  isLoading,
  type,
  points = [],
  target: slug
}) => {
  if (isLoading) {
    return PreviewLoader
  }

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
    />
  )
}

const mapStateToProps = state => {
  return {
    points: state.signals.points,
    isLoading: state.signals.isLoading,
    isError: state.signals.isError
  }
}

export default connect(mapStateToProps)(SignalPreview)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import Loader from '@santiment-network/ui/Loader/Loader'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { mapToRequestedMetrics, Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart, {
  getDataKeys,
  GetReferenceDots,
  mapWithTimeseries,
  mapWithTimeseriesAndYCoord
} from './VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'
import { DesktopOnly } from './../../../components/Responsive'
import styles from './SignalPreview.module.scss'

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
  const [baseType, setType] = useState(type)

  if (baseType !== type) setType(type)

  const metrics = getMetricsByType(type)
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

        const dataKeys = getDataKeys(triggeredSignals[0])
        const signals = mapWithTimeseriesAndYCoord(
          triggeredSignals,
          dataKeys,
          data
        )

        const referenceDots = GetReferenceDots(signals)

        console.log(metricsForSignalsChart)

        return (
          <>
            <VisualBacktestChart
              data={data}
              dataKeys={dataKeys}
              label={label}
              triggeredSignals={triggeredSignals}
              metrics={metricsForSignalsChart}
              referenceDots={referenceDots}
            />
            <DesktopOnly>
              <ChartExpandView>
                <ChartWidget
                  metrics={metrics}
                  timeRange={timeRange}
                  slug={slug}
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
  target: slug,
  height
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
      height={height}
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

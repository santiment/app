import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ReferenceLine } from 'recharts'
import Loader from '@santiment-network/ui/Loader/Loader'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart from './VisualBacktestChart'
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
  const metrics = getMetricsByType(type)
  const [baseType, setType] = useState(type)

  if (baseType !== type) setType(type)

  const requestedMetrics = metrics.map(metric => ({
    name: metric,
    timeRange,
    slug,
    interval: '1d',
    ...Metrics[metric].reqMeta
  }))

  const metricsForSignalsChart = metrics.map(name =>
    name === 'historyPrice' ? 'historyPricePreview' : name
  )

  return (
    <GetTimeSeries
      metrics={requestedMetrics}
      render={({ timeseries }) => {
        if (!timeseries) {
          return PreviewLoader
        }

        return (
          <VisualBacktestChart
            label={label}
            triggeredSignals={triggeredSignals}
            timeseries={timeseries}
            metrics={metricsForSignalsChart}
          />
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
    <>
      <SignalPreviewChart
        type={type}
        slug={slug}
        label={label}
        timeRange={timeRange}
        height={height}
        triggeredSignals={triggeredSignals}
      />

      <DesktopOnly>
        <ChartExpandView>
          <ChartWidget
            timeRange={timeRange}
            slug={slug}
            interval='1d'
            title={slug}
            hideSettings={{
              header: true,
              sidecar: true
            }}
          >
            {triggeredSignals.map(({ datetime }) => (
              <ReferenceLine
                key={datetime}
                stroke='var(--persimmon)'
                x={+new Date(datetime)}
              />
            ))}
          </ChartWidget>
        </ChartExpandView>
      </DesktopOnly>
    </>
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

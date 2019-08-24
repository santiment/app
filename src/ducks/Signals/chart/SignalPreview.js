import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ReferenceLine } from 'recharts'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart from './VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'

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

  const requestedMetrics = metrics.reduce((acc, metric) => {
    acc[metric] = {
      timeRange,
      slug,
      interval: '1d',
      ...Metrics[metric].reqMeta
    }

    return acc
  }, {})

  const metricsForSignalsChart = metrics.map(name =>
    name === 'historyPrice' ? 'historyPricePreview' : name
  )

  return (
    <GetTimeSeries
      metrics={requestedMetrics}
      render={({
        timeseries,
        errorMetrics = {},
        isError,
        errorType,
        ...rest
      }) => {
        if (!timeseries) return 'Loading...'

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

const SignalPreview = ({ type, points = [], target: slug, height }) => {
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
      <ChartExpandView>
        <ChartWidget
          timeRange={timeRange}
          slug={slug}
          interval='1d'
          title={slug}
          hideSettings={{
            search: true,
            sidecar: true,
            signals: true
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

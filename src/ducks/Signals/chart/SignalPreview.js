import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ReferenceLine } from 'recharts'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartMetrics from '../../SANCharts/ChartMetrics'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart from '../VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'
import styles from './SignalPreview.module.scss'

const SignalPreviewChart = ({
  type,
  slug,
  showAxes = false,
  timeRange,
  label,
  triggeredSignals
}) => {
  const initialMetrics = getMetricsByType(type) || ['historyPrice']

  const [metrics, setMetrics] = useState(initialMetrics)
  const [baseType, setType] = useState(type)

  if (baseType !== type) {
    setType(type)
    setMetrics(initialMetrics)
    return
  }

  const _metrics = metrics.filter(metric => initialMetrics.includes(metric))

  const requestedMetrics = metrics.reduce((acc, metric) => {
    acc[metric] = {
      timeRange,
      slug,
      interval: '1d',
      ...Metrics[metric].reqMeta
    }

    return acc
  }, {})

  return (
    <div className={styles.preview}>
      <div className={styles.description}>
        <span className={styles.fired}>Signal was fired:</span>
        <span className={styles.times}>
          {triggeredSignals.length} times in {label}
        </span>
      </div>
      <div className={styles.chartBlock}>
        <div className={styles.chart}>
          <GetTimeSeries
            {...requestedMetrics}
            meta={{
              mergedByDatetime: true
            }}
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
                  triggeredSignals={triggeredSignals}
                  timeseries={timeseries}
                  metrics={_metrics}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
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
              stroke='green'
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

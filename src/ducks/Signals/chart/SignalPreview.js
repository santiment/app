import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Bar, ReferenceLine } from 'recharts'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartMetrics from '../../SANCharts/ChartMetrics'
import ChartWidget from '../../SANCharts/ChartPage'
import VisualBacktestChart from '../VisualBacktestChart'
import { ChartExpandView } from './ChartExpandView'
import styles from './SignalPreview.module.scss'

const CUSTOM_METRICS = {
  triggerDailyActiveAdresses: {
    node: Bar,
    color: 'malibu',
    label: 'Daily Active Addresses',
    dataKey: 'active_addresses',
    orientation: 'right',
    yAxisVisible: true
  },
  volume: {
    ...Metrics.volume,
    color: 'casper'
  }
}
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

  return (
    <div className={styles.preview}>
      <div className={styles.description}>
        <span className={styles.fired}>Signal was fired:</span>{' '}
        <span className={styles.times}>
          {triggeredSignals.length} times in {label}
        </span>
      </div>
      <div className={styles.chartBlock}>
        <div className={styles.chart}>
          <GetTimeSeries
            historyPrice={{
              timeRange,
              slug,
              interval: '1d'
            }}
            render={({
              historyPrice,
              timeseries,
              errorMetrics = {},
              isError,
              errorType,
              ...rest
            }) => {
              if (!historyPrice) {
                return 'Loading...'
              }

              const customMetrics = _metrics.map(metric => {
                return CUSTOM_METRICS[metric] || metric
              })

              return (
                historyPrice && (
                  <VisualBacktestChart
                    triggeredSignals={triggeredSignals}
                    showXY={showAxes}
                    price={historyPrice.items}
                    metrics={customMetrics}
                  />
                )
              )
            }}
          />
        </div>

        <ChartMetrics
          classes={styles}
          slug={slug}
          onMetricsChange={metrics => setMetrics(metrics)}
          defaultActiveMetrics={initialMetrics}
          showOnlyDefault={true}
          listOfMetrics={initialMetrics.reduce((acc, metric) => {
            acc[metric] = CUSTOM_METRICS[metric] || Metrics[metric]
            return acc
          }, {})}
        />
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
          settings={{
            search: false,
            sidecar: false
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

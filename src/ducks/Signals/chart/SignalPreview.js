import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'recharts'
import { getMetricsByType, getTimeRangeForChart } from '../utils/utils'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartMetrics from '../../SANCharts/ChartMetrics'
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
    node: Bar,
    color: 'waterloo',
    label: 'Volume',
    fill: true,
    dataKey: 'price_volume_diff'
  }
}

const SignalPreview = ({ type, points = [], target, height }) => {
  return (
    <Fragment>
      <ChartExpandView>
        <SignalPreviewChart
          type={type}
          points={points}
          target={target}
          height={height}
        />
      </ChartExpandView>
    </Fragment>
  )
}

const SignalPreviewChart = ({ type, points, target, height = 150 }) => {
  const initialMetrics = getMetricsByType(type) || ['historyPrice']

  const [metrics, setMetrics] = useState(initialMetrics)
  const [baseType, setType] = useState(type)

  if (baseType !== type) {
    setType(type)
    setMetrics(initialMetrics)
    return
  }

  const _metrics = metrics.filter(metric => initialMetrics.includes(metric))

  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  const { label, value } = getTimeRangeForChart(type)

  return (
    <div className={styles.preview} style={{ minHeight: height }}>
      <div className={styles.description}>
        <span className={styles.fired}>Signal was fired:</span>{' '}
        <span className={styles.times}>
          {amountOfTriggers} times in {label}
        </span>
      </div>
      <div className={styles.chartBlock} style={{ height: height }}>
        <div className={styles.chart}>
          <GetTimeSeries
            historyPrice={{
              timeRange: value,
              slug: target,
              interval: '1d'
            }}
            render={({
              historyPrice,
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
                    data={points}
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
          slug={target}
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

const mapStateToProps = state => {
  return {
    points: state.signals.points,
    isLoading: state.signals.isLoading,
    isError: state.signals.isError
  }
}

export default connect(mapStateToProps)(SignalPreview)

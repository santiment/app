import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartMetrics from '../../SANCharts/ChartMetrics'
import VisualBacktestChart from '../VisualBacktestChart'
import { getMetricsByType } from '../utils/utils'
import styles from './SignalPreview.module.scss'
import { Bar } from 'recharts'

const PREVIEWS_TIMERANGE_BY_TYPE = {
  daily_active_addresses: '3m',
  price_absolute_change: '3m',
  price_percent_change: '3m',
  price_volume_difference: '6m'
}

const CUSTOM_METRICS = {
  customDailyActiveAdresses: {
    node: Bar,
    color: 'malibu',
    label: 'Daily Active Addresses',
    dataKey: 'active_addresses',
    orientation: 'right',
    yAxisVisible: true
  }
}

const SignalPreview = ({ points = [], target, type }) => {
  const initialMetrics = getMetricsByType(type) || ['historyPrice']

  const [metrics, setMetrics] = useState(initialMetrics)

  const _metrics = metrics.filter(metric => initialMetrics.includes(metric))
  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  const timeRange = PREVIEWS_TIMERANGE_BY_TYPE[type] || '3m'

  return (
    <Fragment>
      <div>
        <span className={styles.fired}>Signal was fired:</span>{' '}
        <span className={styles.times}>
          {amountOfTriggers} times in {timeRange}
        </span>
      </div>
      <div className={styles.chartBlock}>
        <GetTimeSeries
          historyPrice={{
            timeRange: timeRange,
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

        <ChartMetrics
          slug={target}
          onMetricsChange={metrics => setMetrics(metrics)}
          defaultActiveMetrics={initialMetrics}
          showOnlyDefault={true}
          listOfMetrics={initialMetrics.reduce((acc, metric) => {
            acc[metric] = Metrics[metric] || CUSTOM_METRICS[metric]
            return acc
          }, {})}
        />
      </div>
    </Fragment>
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

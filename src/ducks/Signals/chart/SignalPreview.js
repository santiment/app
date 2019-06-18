import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'recharts'
import { Metrics } from '../../SANCharts/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import ChartMetrics from '../../SANCharts/ChartMetrics'
import VisualBacktestChart from '../VisualBacktestChart'
import styles from './SignalPreview.module.scss'
import { getMetricsByType } from '../utils/utils'

const PREVIEWS_TIMERANGE_BY_TYPE = {
  daily_active_addresses: '3m',
  price_absolute_change: '3m',
  price_percent_change: '3m',
  price_volume_difference: '6m'
}

const CHART_SETTINGS = {
  active_addresses: {
    node: Bar,
    color: 'malibu',
    label: 'Daily Active Addresses',
    orientation: 'right',
    yAxisVisible: true,
    dataKey: 'active_addresses'
  }
}

const normalizeTimeseries = items =>
  items.map(item => ({ ...item, datetime: +new Date(item.datetime) }))

const getTimerangeByType = type =>
  PREVIEWS_TIMERANGE_BY_TYPE[type] ? PREVIEWS_TIMERANGE_BY_TYPE[type] : '3m'

const SignalPreview = ({ points = [], target, type }) => {
  const initialMetrics = getMetricsByType(type) || ['historyPrice']

  const [metrics, setMetrics] = useState(initialMetrics)

  const _metrics = metrics.filter(metric => initialMetrics.includes(metric))
  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  const timeRange = getTimerangeByType(type)

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
            const data = normalizeTimeseries(points)
            const customMetrics = _metrics.map(metric =>
              CHART_SETTINGS[metric] ? CHART_SETTINGS[metric] : metric
            )
            const _price = normalizeTimeseries(historyPrice.items)
            return (
              historyPrice && (
                <VisualBacktestChart
                  data={data}
                  price={_price}
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
            acc[metric] = Metrics[metric] || CHART_SETTINGS[metric]
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

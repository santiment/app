import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'recharts'
import { Message } from '@santiment-network/ui'
import { Metrics } from './../SANCharts/utils'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import ChartMetrics from './../SANCharts/ChartMetrics'
import VisualBacktestChart from './VisualBacktestChart'

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

const SignalPreview = ({
  points = [],
  target,
  initialMetrics = ['price'],
  type
}) => {
  const [metrics, setMetrics] = useState(initialMetrics)
  const _metrics = metrics.filter(metric => initialMetrics.includes(metric))
  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  return (
    <Fragment>
      <Message variant='success'>
        Trigger fired {amountOfTriggers} times in past{' '}
        {getTimerangeByType(type.value)}
      </Message>
      <GetTimeSeries
        price={{
          timeRange: getTimerangeByType(type.value),
          slug: target,
          interval: '1d'
        }}
        render={({ price, errorMetrics = {}, isError, errorType, ...rest }) => {
          if (!price) {
            return 'Loading...'
          }
          const data = normalizeTimeseries(points)
          const customMetrics = _metrics.map(metric =>
            CHART_SETTINGS[metric] ? CHART_SETTINGS[metric] : metric
          )
          const _price = normalizeTimeseries(price.items)
          return (
            price && (
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
        onMetricsChange={metrics => setMetrics(metrics)}
        defaultActiveMetrics={initialMetrics}
        listOfMetrics={initialMetrics.reduce((acc, metric) => {
          acc[metric] = Metrics[metric] || CHART_SETTINGS[metric]
          return acc
        }, {})}
      />
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

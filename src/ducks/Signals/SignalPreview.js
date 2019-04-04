import React, { Fragment, useState } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import { Message } from '@santiment-network/ui'
import { Metrics, generateMetricsMarkup } from './../SANCharts/utils'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import ChartMetrics from './../SANCharts/ChartMetrics'
import { formatNumber } from './../../utils/formatting'

const normalizeTimeseries = items =>
  items.map(item => ({ ...item, datetime: moment(item.datetime).unix() }))

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
        Trigger fired {amountOfTriggers} times in past 6m
      </Message>
      <GetTimeSeries
        price={{
          timeRange: getTimerangeByType(type),
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

const VisualBacktestChart = ({ data, price, metrics }) => {
  return (
    <ResponsiveContainer width='100%' height={150}>
      <ComposedChart data={price}>
        <XAxis
          dataKey='datetime'
          type='number'
          scale='time'
          tickLine={true}
          tickCount={180}
          minTickGap={10}
          interval={'preserveStart'}
          tickFormatter={timeStr => moment.unix(timeStr).format('MMM YY')}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis hide />
        {generateMetricsMarkup(metrics, { active_addresses: data })}

        {data
          .filter(point => point['triggered?'])
          .map(point => (
            <ReferenceLine
              key={point.datetime}
              stroke='green'
              x={point.datetime}
            />
          ))}
        <Tooltip
          labelFormatter={date => moment.unix(date).format('dddd, MMM DD YYYY')}
          formatter={(value, name) => {
            if (name === 'price') {
              return formatNumber(value, { currency: 'USD' })
            }
            return value.toFixed(2)
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
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

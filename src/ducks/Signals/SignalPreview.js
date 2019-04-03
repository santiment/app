import React, { Fragment, useState } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import { Message } from '@santiment-network/ui'
import { mergeTimeseriesByKey } from './../../utils/utils'
import {
  getMetricCssVarColor,
  Metrics,
  generateMetricsMarkup
} from './../SANCharts/utils'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import ChartMetrics from './../SANCharts/ChartMetrics'
import { formatNumber } from './../../utils/formatting'

// TODO: add error, loading
const SignalPreview = ({
  points = [],
  target,
  metrics: initialMetrics = ['price']
}) => {
  const [metrics, setMetrics] = useState(initialMetrics)
  // console.log(metrics, initialMetrics)
  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  return (
    <Fragment>
      <Message variant='success'>
        Trigger fired {amountOfTriggers} times in past 6m
      </Message>
      {
        // JSON.stringify(points.filter(point => !!point['triggered?']))
      }
      <GetTimeSeries
        price={{
          timeRange: '6m',
          slug: target,
          interval: '1d'
        }}
        // meta={{
        // mergedByDatetime: true
        // }}
        render={({ price, errorMetrics = {}, isError, errorType, ...rest }) => {
          if (!price) {
            return 'Loading...'
          }
          // const data = mergeTimeseriesByKey({
          // timeseries: [timeseries, points],
          // key: 'datetime'
          // })
          // console.log(timeseries, points, data)
          return (
            price && (
              <VisualBacktestChart
                data={points}
                price={price.items}
                metrics={metrics}
              />
            )
          )
        }}
      />

      <ChartMetrics
        onMetricsChange={metrics => setMetrics(metrics)}
        defaultActiveMetrics={initialMetrics}
        listOfMetrics={initialMetrics.reduce((acc, metric) => {
          acc[metric] = Metrics[metric]
          return acc
        }, {})}
      />
    </Fragment>
  )
}

const VisualBacktestChart = ({ data, price, metrics }) => {
  const _data = data.map(item => ({
    ...item,
    datetime: moment(item.datetime).unix()
  }))

  const _price = price.map(item => ({
    ...item,
    datetime: moment(item.datetime).unix()
  }))
  return (
    <ResponsiveContainer width='100%' height={150}>
      <ComposedChart data={_data}>
        <XAxis
          dataKey='datetime'
          type='number'
          tickLine={false}
          tickFormatter={timeStr => moment.unix(timeStr).format('DD MMM YY')}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis hide />
        <YAxis
          yAxisId='axis-price'
          hide
          type='number'
          domain={['auto', 'dataMax']}
        />
        <Line
          type='linear'
          data={_price}
          yAxisId='axis-price'
          name={'Price'}
          dot={false}
          strokeWidth={1.5}
          stroke={getMetricCssVarColor('price')}
          dataKey='priceUsd'
          isAnimationActive={false}
        />

        {generateMetricsMarkup(metrics.filter(metric => metric !== 'price'))}

        {_data
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

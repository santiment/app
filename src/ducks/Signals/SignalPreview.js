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
  console.log(metrics, initialMetrics)
  const amountOfTriggers = points.reduce(
    (acc, val) => (acc += +val['triggered?']),
    0
  )

  return (
    <Fragment>
      <div>Trigger fires {amountOfTriggers} times in past 6m</div>
      <GetTimeSeries
        price={{
          timeRange: '6m',
          slug: target,
          interval: '1d'
        }}
        meta={{
          mergedByDatetime: true
        }}
        render={({
          timeseries = [],
          errorMetrics = {},
          isError,
          errorType,
          ...rest
        }) => {
          const data = mergeTimeseriesByKey({
            timeseries: [timeseries, points],
            key: 'datetime'
          })
          return <VisualBacktestChart data={data} metrics={metrics} />
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

const VisualBacktestChart = ({ data, metrics }) => {
  return (
    <ResponsiveContainer width='100%' height={150}>
      <ComposedChart data={data}>
        <XAxis
          dataKey='datetime'
          hide
          tickLine={false}
          minTickGap={100}
          tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
        />
        <YAxis
          yAxisId='axis-price'
          hide
          type='number'
          domain={['auto', 'dataMax']}
        />
        <Line
          type='linear'
          yAxisId='axis-price'
          name={'Price'}
          dot={false}
          strokeWidth={1.5}
          stroke={getMetricCssVarColor('price')}
          dataKey='priceUsd'
          isAnimationActive={false}
        />

        {generateMetricsMarkup(metrics)}

        {data
          .filter(point => point['triggered?'])
          .map(point => (
            <ReferenceLine
              key={point.datetime}
              yAxisId='axis-price'
              stroke='green'
              x={point.datetime}
            />
          ))}
        <Tooltip
          labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
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

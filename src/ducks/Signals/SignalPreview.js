import React, { Fragment } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import { formatNumber } from './../../utils/formatting'

const SignalPreview = ({ points = [] }) => {
  // TODO: add error, loading
  const visualBacktestChart = (
    <ResponsiveContainer width='100%' height={150}>
      <ComposedChart data={points}>
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
          name={'price'}
          dot={false}
          strokeWidth={1.5}
          dataKey='price'
          isAnimationActive={false}
        />
        {points
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

  return (
    <Fragment>
      <label>Signal Visual Backtest</label>
      {visualBacktestChart}
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

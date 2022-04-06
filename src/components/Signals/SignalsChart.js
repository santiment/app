import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { getDateFormats } from '../../utils/dates'
import { formatNumber, millify } from './../../utils/formatting'

const labelFormatter = (date) => {
  const { dddd, MMM, DD, YYYY } = getDateFormats(new Date(date))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

const tickFormatter = (date) => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const SignalsChart = ({ chartData = [] }) => {
  return (
    <div className='TrendsExploreChart'>
      <ResponsiveContainer width='100%' height={300}>
        <ComposedChart data={chartData}>
          <XAxis
            dataKey='datetime'
            tickLine={false}
            minTickGap={100}
            tickFormatter={tickFormatter}
          />

          <YAxis
            yAxisId='axis-price'
            type='number'
            domain={['auto', 'auto']}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId='axis-volume'
            orientation='right'
            domain={['auto', 'auto']}
            tickFormatter={millify}
            tickLine={false}
            axisLine={false}
          />
          <Area
            type='linear'
            yAxisId='axis-price'
            name={'Price'}
            dot={false}
            strokeWidth={1.5}
            stroke='#70dbed'
            fill='#70dbed55'
            dataKey='priceUsd'
            isAnimationActive={false}
          />
          <Area
            type='linear'
            yAxisId='axis-volume'
            name={'Volume'}
            stroke='#e0752d'
            fill='#e0752d55'
            dot={false}
            strokeWidth={1.5}
            isAnimationActive={false}
            dataKey='volume'
          />

          <Tooltip
            labelFormatter={labelFormatter}
            formatter={(value, name) => formatNumber(value, { currency: 'USD' })}
          />

          <CartesianGrid stroke='rgba(200, 200, 200, .2)' />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

SignalsChart.defaultProps = {
  data: {},
  isLoading: true,
}

export default SignalsChart

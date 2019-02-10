import React from 'react'
import moment from 'moment'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { compose, withProps } from 'recompose'
import { formatNumber } from './../../utils/formatting'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'

const Charts = ({ chartData = [], settings: { socialVolume = {} } }) => (
  <div className='TrendsExploreChart'>
    <ResponsiveContainer width='100%' height={300}>
      <ComposedChart data={chartData}>
        <XAxis
          dataKey='datetime'
          tickLine={false}
          minTickGap={100}
          tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
        />
        <YAxis
          yAxisId='axis-price'
          type='number'
          domain={['auto', 'dataMax']}
        />
        <YAxis
          yAxisId='axis-devActivity'
          hide
          type='number'
          domain={['auto', 'dataMax']}
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
        <Line
          type='linear'
          yAxisId='axis-devActivity'
          name={socialVolume.title}
          dot={false}
          strokeWidth={1.5}
          stroke='red'
          dataKey='socialVolume'
          isAnimationActive={false}
        />
        <Tooltip
          labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
          formatter={(value, name) => {
            if (name === socialVolume.title) {
              return socialVolume.formatter(value)
            }
            return formatNumber(value, { currency: 'USD' })
          }}
        />
        {mixWithPaywallArea({
          yAxisId: 'axis-price',
          dataKey: 'priceUsd',
          domain: [0],
          stroke: 'red',
          strokeOpacity: 0.9,
          data: chartData
        })}
        <CartesianGrid stroke='rgba(200, 200, 200, .2)' />
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
)

Charts.defaultProps = {
  data: {},
  isLoading: true
}

export default compose(
  withProps(({ ...rest }) => {
    // console.log(rest)
    return rest
  })
)(Charts)

import React from 'react'
import moment from 'moment'
import {
  ResponsiveContainer,
  ReferenceArea,
  ComposedChart,
  Legend,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { compose, withProps } from 'recompose'
import { formatNumber, millify } from './../../utils/formatting'

const PaywallArea = ({
  x,
  y,
  width,
  height,
  fill,
  fillOpacity,
  viewBox,
  strokeWidth,
  stroke
}) => {
  return (
    <svg
      width={width}
      height={height}
      x={x}
      y={y}
      fill={fill}
      fillOpacity={fillOpacity}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width={width}
        height={height}
        mask='url(#mask-stripe)'
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={stroke}
      />
    </svg>
  )
}

const Charts = ({ chartData = [] }) => (
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
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
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
        <Tooltip
          labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
          formatter={(value, name) => formatNumber(value, { currency: 'USD' })}
        />
        <pattern
          id='pattern-stripe'
          width='8'
          height='8'
          patternUnits='userSpaceOnUse'
          patternTransform='rotate(45)'
        >
          <rect width='4' height='8' transform='translate(0,0)' fill='white' />
        </pattern>
        <mask id='mask-stripe'>
          <rect
            x='0'
            y='0'
            width='100%'
            height='100%'
            fill='url(#pattern-stripe)'
          />
        </mask>
        <ReferenceArea
          yAxisId='axis-price'
          x1={'2018-07-14T00:00:00Z'}
          x2={'2018-10-23T00:00:00Z'}
          y1={0}
          y2={0.3}
          stroke='red'
          shape={PaywallArea}
          label='any label'
          strokeOpacity={0.9}
        />
        <CartesianGrid stroke='rgba(200, 200, 200, .2)' />
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
)

// <svg width="13" height="10" viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"> <title>Path 277</title> <path stroke="#57DA06" stroke-width="2" d="M1 5l3.5 3.5 7-7.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/> </svg>
// <ReferenceArea
// x1={+moment('2018-04-14T00:00:00Z').unix()}
// x2={+moment('2018-05-14T00:00:00Z').unix()}
// y1={0}
// y2={1}
// stroke="red"
// strokeOpacity={0.3} />

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

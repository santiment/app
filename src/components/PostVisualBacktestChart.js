import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  ReferenceLine,
  ReferenceDot
} from 'recharts'
import './PostVisualBacktestChart.css'

const Color = {
  POSITIVE: 'rgb(48, 157, 129)',
  NEGATIVE: 'rgb(200, 47, 63)'
}

const PostVisualBacktestChart = ({
  history: { historyPrice },
  postUpdatedAt,
  changePriceProp,
  change,
  startValue
}) => {
  const dataset = historyPrice.map(data => ({
    datetime: data.datetime,
    value: data[changePriceProp]
  }))

  return (
    <div className='PostVisualBacktestChart'>
      <ResponsiveContainer width='100%'>
        <LineChart
          data={dataset}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <XAxis dataKey='datetime' hide />
          <Line
            dataKey='value'
            type='linear'
            dot={false}
            strokeWidth={2}
            stroke='var(--grey-dark)'
            isAnimationActive={false}
          />
          <ReferenceDot
            x={postUpdatedAt}
            y={startValue[changePriceProp]}
            alwaysShow
            r={4}
            isFront
            stroke={change > 0 ? Color.POSITIVE : Color.NEGATIVE}
            strokeWidth='1.5px'
            fill='var(--white)'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PostVisualBacktestChart

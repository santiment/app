import React from 'react'
import { Area, AreaChart } from 'recharts'
import { sortByAsDates } from '../../../../../utils/sortMethods'
import Gradients from '../../WatchlistOverview/Gradients'

const PriceGraph = ({ data = [], className, width = 90 }) => {
  if (!data || data.length < 10) {
    return null
  }

  const clearData = data
    .filter(({ value }) => Boolean(value))
    .sort(sortByAsDates('datetime'))
    .reverse()

  const minValue = Math.min(...clearData.map(({ value }) => value))
  const normalizedData = clearData.map(item => ({
    ...item,
    value: item.value - minValue
  }))

  const { value: latestValue } = clearData[clearData.length - 1]
  const { value } = clearData[0]
  const color = `var(--${latestValue >= value ? 'lima' : 'persimmon'})`

  return (
    <div className={className}>
      <AreaChart data={normalizedData} height={45} width={width}>
        <defs>
          <Gradients />
        </defs>
        <Area
          dataKey='value'
          type='monotone'
          strokeWidth={1.5}
          stroke={color}
          fill={`url(#total${latestValue >= value ? 'Up' : 'Down'})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </div>
  )
}

export default PriceGraph

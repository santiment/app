import React from 'react'
import { Area, AreaChart } from 'recharts'
import Gradients from '../../WatchlistOverview/Gradients'
import { calcPercentageChange } from '../../../../../utils/utils'

export const useAreaData = (stats, key = 'value') => {
  const { [key]: latestValue } = stats.slice(-1)[0] || {}
  const { [key]: value } = stats.slice(0, 1)[0] || {}
  const change = value ? calcPercentageChange(value, latestValue) : 0
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`
  const minValue = Math.min(...stats.map(({ [key]: value }) => value))
  const chartStats = stats.map(stat => ({
    ...stat,
    [key]: stat[key] - minValue
  }))

  return { change, chartStats, color, value, latestValue }
}

const ChangeChart = ({ data, dataKey = 'value', width }) => {
  const { chartStats, latestValue, color, value } = useAreaData(data, dataKey)

  return (
    <AreaChart data={chartStats} height={45} width={width}>
      <defs>
        <Gradients />
      </defs>
      <Area
        dataKey={dataKey}
        type='monotone'
        strokeWidth={1.5}
        stroke={color}
        fill={`url(#total${latestValue >= value ? 'Up' : 'Down'})`}
        isAnimationActive={false}
      />
    </AreaChart>
  )
}

export default ChangeChart

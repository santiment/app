import React from 'react'
import { Area, AreaChart, Tooltip } from 'recharts'
import Gradients from '../../../../../components/Gradients'
import { calcPercentageChange } from '../../../../../utils/utils'
import ChartTooltip from '../../../../SANCharts/tooltip/CommonChartTooltip'
import { tooltipLabelFormatter } from '../../../../dataHub/metrics/formatters'

const labelFormatter = (label, payload) => {
  if (!payload[0]) {
    return
  }

  return tooltipLabelFormatter(payload[0].payload.datetime)
}

export const useAreaData = (stats, key = 'value') => {
  const { [key]: latestValue } = stats.slice(-1)[0] || {}
  const { [key]: value } = stats.slice(0, 1)[0] || {}
  const change = value ? calcPercentageChange(value, latestValue) : 0
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`
  const minValue = Math.min(...stats.map(({ [key]: value }) => value))
  const chartStats = stats.map((stat) => ({
    ...stat,
    originalValue: stat[key],
    [key]: stat[key] - minValue,
  }))

  return { change, chartStats, color, value, latestValue }
}

const ChangeChart = ({ data, dataKey = 'value', color: forceColor, ...rest }) => {
  const area = useAreaData(data, dataKey)

  return <ChangeChartTemplate {...area} dataKey={dataKey} forceColor={forceColor} {...rest} />
}

export const ChangeChartTemplate = ({
  chartStats,
  latestValue,
  color,
  value,
  width,
  height = 45,
  showTooltip,
  dataKey = 'value',
  forceColor,
  valueFormatter,
}) => (
  <AreaChart data={chartStats} height={height} width={width}>
    <defs>
      <Gradients downColor={forceColor} upColor={forceColor} />
    </defs>
    <Area
      dataKey={dataKey}
      type='monotone'
      strokeWidth={1.5}
      stroke={forceColor || color}
      fill={`url(#total${latestValue >= value ? 'Up' : 'Down'})`}
      isAnimationActive={false}
    />

    {showTooltip && (
      <Tooltip
        content={
          <ChartTooltip
            name='ROI'
            labelFormatter={labelFormatter}
            valueFormatter={valueFormatter}
          />
        }
        cursor={false}
        dataKey={dataKey}
        isAnimationActive={false}
      />
    )}
  </AreaChart>
)

export default ChangeChart

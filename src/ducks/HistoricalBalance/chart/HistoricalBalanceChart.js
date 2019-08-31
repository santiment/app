import React from 'react'
import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { mergeTimeseriesByKey } from '../../../utils/utils'
import { getDateFormats } from '../../../utils/dates'
import styles from './HistoricalBalanceChart.module.scss'
import { formatTokensCount } from '../../../utils/formatting'
import ChartTooltip from '../../SANCharts/tooltip/CommonChartTooltip'

const formatDatetime = datetime => {
  const { DD, MMM, YY } = getDateFormats(new Date(datetime))
  return `${DD} ${MMM} ${YY}`
}

const formatTooltipDatetime = datetime => {
  const { DD, MMM, YY } = getDateFormats(new Date(datetime))
  return `${MMM} ${DD}, ${YY}`
}

const COLORS = ['#14C393', '#8358FF', '#5275FF', '#FF5B5B', '#68DBF4']

const HistoricalBalanceChart = ({ data, showYAxes = true }) => {
  const timeseries = Object.keys(data).map(name => {
    if (!data[name]) return []
    return data[name].items.map(({ datetime, balance }) => ({
      datetime,
      [name]: balance
    }))
  })
  const normalizedData = mergeTimeseriesByKey({
    timeseries,
    key: 'datetime'
  })

  const yAxes = Object.keys(data).map((name, index) => (
    <YAxis
      yAxisId={name}
      hide={!showYAxes}
      tickFormatter={formatTokensCount}
      stroke={COLORS[index]}
      key={name}
    />
  ))

  const lines = Object.keys(data).map((name, index) => {
    return (
      <Line
        type='linear'
        dot={false}
        stroke={COLORS[index]}
        dataKey={name}
        yAxisId={name}
        name={name}
        key={index}
      />
    )
  })

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={normalizedData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey='datetime'
            minTickGap={100}
            tickFormatter={formatDatetime}
          />
          <CartesianGrid
            vertical={false}
            strokeDasharray='4 10'
            stroke='#ebeef5'
          />
          <Legend verticalAlign='bottom' height={36} />
          {yAxes}
          {lines}
          <Tooltip
            content={
              <ChartTooltip
                labelFormatter={formatTooltipDatetime}
                formatter={formatTokensCount}
                className={styles.tooltip}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalBalanceChart

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
import { labelFormatter } from '../../../utils/formatting'

const formatDatetime = datetime => {
  const { MMM } = getDateFormats(new Date(datetime))
  return MMM
}

const COLORS = ['#14C393', '#8358FF', '#5275FF', '#FF5B5B', '#68DBF4']

const HistoricalBalanceChart = ({ data }) => {
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

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width='100%'>
        <LineChart
          data={normalizedData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            minTickGap={30}
            dataKey='datetime'
            tickFormatter={formatDatetime}
          />
          <CartesianGrid
            vertical={false}
            strokeDasharray='4 10'
            stroke='#ebeef5'
          />
          <Legend verticalAlign='bottom' height={36} />
          {Object.keys(data).map(name => (
            <YAxis yAxisId={name} hide key={name} />
          ))}
          <Tooltip
            labelFormatter={labelFormatter}
            formatter={value => new Intl.NumberFormat().format(value)}
          />
          {Object.keys(data).map((name, index) => {
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
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalBalanceChart

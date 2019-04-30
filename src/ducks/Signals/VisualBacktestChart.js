import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import { generateMetricsMarkup } from './../SANCharts/utils'
import { formatNumber } from './../../utils/formatting'
import { getDateFormats } from '../../utils/dates'

const VisualBacktestChart = ({ data, price, metrics }) => {
  return (
    <ResponsiveContainer width='100%' height={150}>
      <ComposedChart data={price}>
        <XAxis
          dataKey='datetime'
          type='number'
          scale='time'
          tickLine
          allowDataOverflow
          tickFormatter={timeStr => {
            const { MMM, YY } = getDateFormats(new Date(timeStr))
            return `${MMM} ${YY}`
          }}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis hide />
        {generateMetricsMarkup(metrics, { active_addresses: data })}

        {data
          .filter(point => point['triggered?'])
          .map(point => (
            <ReferenceLine
              key={point.datetime}
              stroke='green'
              x={point.datetime}
            />
          ))}
        <Tooltip
          labelFormatter={date => {
            const { dddd, MMM, DD, YYYY } = getDateFormats(new Date(date))
            return `${dddd}, ${MMM} ${DD} ${YYYY}`
          }}
          content={<CustomTooltip />}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const priceValue = payload[0].payload.price
      ? formatNumber(payload[0].payload.price, { currency: 'USD' })
      : undefined
    return (
      <div
        className='custom-tooltip'
        style={{
          margin: 0,
          padding: 10,
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(204, 204, 204)',
          whiteSpace: 'nowrap'
        }}
      >
        <p className='label'>{`${payload[0].name} : ${payload[0].value}`}</p>
        {priceValue && <p className='price'>{`Price : ${priceValue}`}</p>}
      </div>
    )
  }

  return ''
}

export default VisualBacktestChart

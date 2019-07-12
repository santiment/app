import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import cx from 'classnames'
import { generateMetricsMarkup } from './../SANCharts/utils'
import { formatNumber, labelFormatter } from './../../utils/formatting'
import { getDateFormats } from '../../utils/dates'
import chartStyles from './../SANCharts/Chart.module.scss'
import sharedStyles from './../SANCharts/ChartPage.module.scss'
import styles from './chart/SignalPreview.module.scss'

const mapWithTimeseries = items =>
  items.map(item => ({ ...item, datetime: +new Date(item.datetime) }))

const VisualBacktestChart = ({ data, price, metrics, showAxes = false }) => {
  const formattedPrice = mapWithTimeseries(price)
  const formattedData = mapWithTimeseries(data)

  const renderChart = () => {
    return (
      <ComposedChart
        data={formattedPrice}
        margin={{
          left: -20,
          bottom: 0
        }}
      >
        <XAxis
          dataKey='datetime'
          type='number'
          scale='time'
          tickLine={false}
          allowDataOverflow
          tickFormatter={timeStr => {
            const { MMM, YY } = getDateFormats(new Date(timeStr))
            return `${MMM} ${YY}`
          }}
          domain={['dataMin', 'dataMax']}
        />

        <YAxis hide />

        {generateMetricsMarkup(metrics, {
          data: {
            active_addresses: formattedData
          }
        })}

        {formattedData
          .filter(point => point['triggered?'])
          .map(point => (
            <ReferenceLine
              key={point.datetime}
              stroke='green'
              x={point.datetime}
            />
          ))}
        <Tooltip labelFormatter={labelFormatter} content={<CustomTooltip />} />
      </ComposedChart>
    )
  }

  return (
    <div
      className={cx(
        chartStyles.wrapper + ' ' + sharedStyles.chart + ' ' + styles.wrapper,
        styles.container
      )}
    >
      <ResponsiveContainer width='100%' height='100%'>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

const formatTooltipValue = (isPrice, value) =>
  isPrice ? formatNumber(value, { currency: 'USD' }) : value.toFixed(2)

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const priceValue = payload[0].payload.price
      ? formatTooltipValue(true, payload[0].payload.price)
      : undefined

    const { name, value } = payload[0]
    const formattedValue = formatTooltipValue(name === 'Price', value)

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
        <p className='label'>{`${name} : ${formattedValue}`}</p>
        {priceValue && <p className='price'>{`Price : ${priceValue}`}</p>}
      </div>
    )
  }

  return ''
}

export default VisualBacktestChart

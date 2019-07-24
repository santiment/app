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

const VisualBacktestChart = ({
  triggeredSignals,
  timeseries = [],
  metrics
}) => {
  const data = mapWithTimeseries(timeseries)
  const markup = generateMetricsMarkup(metrics)

  const renderChart = () => {
    return (
      <ComposedChart
        data={data}
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

        {markup}

        {triggeredSignals.map(point => (
          <ReferenceLine
            key={point.datetime}
            stroke='green'
            x={+new Date(point.datetime)}
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
      <ResponsiveContainer width='100%' height={120}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

const formatTooltipValue = (isPrice, value) =>
  isPrice ? formatNumber(value, { currency: 'USD' }) : value.toFixed(2)

const getTooltipDate = time => {
  const { dddd, DD, MMM, YYYY } = getDateFormats(new Date(time))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
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
        {payload[0] && (
          <p className={styles.tooltipLabel}>
            {getTooltipDate(payload[0].payload.datetime)}
          </p>
        )}
        {payload.map(({ name, value, stroke, fill }) => {
          return (
            <div
              key={name}
              className={cx('label', styles.tooltipLabel)}
              style={{ color: stroke || fill }}
            >{`${name} : ${formatTooltipValue(name === 'Price', value)}`}</div>
          )
        })}
      </div>
    )
  }

  return ''
}

export default VisualBacktestChart

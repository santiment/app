import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ReferenceLine
} from 'recharts'
import cx from 'classnames'
import { generateMetricsMarkup } from './../SANCharts/utils'
import { formatNumber, labelFormatter } from './../../utils/formatting'
import { getDateFormats } from '../../utils/dates'
import chartStyles from './../SANCharts/Chart.module.scss'
import sharedStyles from './../SANCharts/ChartPage.module.scss'
import styles from './chart/SignalPreview.module.scss'

export const getDataKeys = (signal = {}) => {
  if (signal.active_addresses) {
    return { metric: 'dailyActiveAddresses', signal: 'active_addresses' }
  }
  if (signal.price) return { metric: 'priceUsd', signal: 'price' }
  return { metric: 'priceUsd  ' }
}

const mapWithTimeseries = items =>
  items.map(item => ({ ...item, datetime: +new Date(item.datetime) }))

const mapWithMidnightTime = date => {
  const datetime = new Date(date)
  datetime.setUTCHours(0, 0, 0, 0)
  return +new Date(datetime)
}

const VisualBacktestChart = ({
  triggeredSignals,
  timeseries = [],
  metrics
}) => {
  const data = mapWithTimeseries(timeseries)
  const dataKeys = getDataKeys(triggeredSignals[0])

  const metricsModified = metrics.map(metric =>
    metric === 'historyPrice' ? 'historyPricePreview' : metric
  )
  const markup = generateMetricsMarkup(metricsModified)

  const renderChart = () => {
    return (
      <ComposedChart
        data={data}
        margin={{
          left: 0,
          bottom: 0
        }}
      >
        <XAxis
          dataKey='datetime'
          type='number'
          scale='time'
          tick={false}
          allowDataOverflow
          domain={['dataMin', 'dataMax']}
          hide
        />

        <YAxis hide domain={['auto', 'dataMax']} dataKey={dataKeys.metric} />

        {markup}

        {triggeredSignals.map((point, i) => {
          let price
          const isPrice = dataKeys.signal === 'price'
          const date = isPrice
            ? mapWithMidnightTime(point.datetime)
            : +new Date(point.datetime)

          if (isPrice) {
            const item = data.find(({ datetime }) => datetime === date)
            price = item ? item.priceUsd : point.price
          }

          return dataKeys.signal ? (
            <ReferenceDot
              x={date}
              y={price || point[dataKeys.signal]}
              key={i}
              ifOverflow='extendDomain'
              r={3}
              isFront
              stroke='var(--white)'
              strokeWidth='2px'
              fill='var(--persimmon)'
            />
          ) : (
            <ReferenceLine stroke='#FF5B5B' x={date} key={i} />
          )
        })}
        <Tooltip labelFormatter={labelFormatter} content={<CustomTooltip />} />
      </ComposedChart>
    )
  }

  return (
    <div className={styles.preview}>
      <div className={styles.description}>
        <span className={styles.fired}>Signal was fired:</span>
        <span className={styles.times}>
          {triggeredSignals.length} times in {label}
        </span>
      </div>
      <div className={styles.chartBlock}>
        <div className={styles.chart}>
          <div
            className={cx(
              chartStyles.wrapper +
                ' ' +
                sharedStyles.chart +
                ' ' +
                styles.wrapper,
              styles.container
            )}
          >
            <ResponsiveContainer width='100%' height={120}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
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

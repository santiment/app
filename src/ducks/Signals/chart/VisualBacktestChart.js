import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot
} from 'recharts'
import cx from 'classnames'
import Gradients from '../../../components/WatchlistOverview/Gradients'
import { generateMetricsMarkup } from './../../SANCharts/utils'
import CustomTooltip from './../../SANCharts/CustomTooltip'
import chartStyles from './../../SANCharts/Chart.module.scss'
import sharedStyles from './../../SANCharts/ChartPage.module.scss'
import styles from './SignalPreview.module.scss'

export function GetReferenceDots (signals, yAxisId) {
  return signals.map(({ date, yCoord }, idx) => (
    <ReferenceDot
      x={date}
      y={yCoord}
      yAxisId={yAxisId}
      key={idx}
      ifOverflow='extendDomain'
      r={3}
      isFront
      stroke='var(--white)'
      strokeWidth='2px'
      fill='var(--persimmon)'
    />
  ))
}

const VisualBacktestChart = ({
  triggeredSignals,
  metrics,
  label,
  data,
  dataKeys,
  signals,
  referenceDots
}) => {
  const markup = generateMetricsMarkup(metrics)

  const renderChart = () => {
    return (
      <ComposedChart data={data}>
        <defs>
          <Gradients />
        </defs>
        <XAxis
          dataKey='datetime'
          type='number'
          scale='time'
          tick={false}
          allowDataOverflow
          domain={['dataMin', 'dataMax']}
          hide
        />
        <YAxis
          hide
          domain={['auto', 'dataMax']}
          dataKey={dataKeys.metric}
          interval='preserveStartEnd'
        />

        {markup}

        {referenceDots}
        <Tooltip
          content={<CustomTooltip />}
          position={{ x: 0, y: -30 }}
          isAnimationActive={false}
        />
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
              chartStyles.wrapper,
              sharedStyles.chart,
              styles.wrapper
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

export const getDataKeys = (signal = {}) => {
  if (signal.active_addresses) {
    return {
      metric: 'dailyActiveAddresses',
      key: 'daily_active_addresses',
      signal: 'active_addresses'
    }
  }

  return { metric: 'priceUsd', signal: 'price', key: 'priceUsd' }
}

export const mapWithTimeseries = items =>
  items.map(item => ({
    ...item,
    datetime: +new Date(item.datetime),
    index: item.datetime
  }))

export const mapWithMidnightTime = date => {
  const datetime = new Date(date)
  datetime.setUTCHours(0, 0, 0, 0)
  return +new Date(datetime)
}

export const mapWithTimeseriesAndYCoord = (items, dataKeys, data) => {
  return dataKeys.signal === 'price'
    ? items.map(point => {
      const date = mapWithMidnightTime(point.datetime)
      const item = data.find(({ datetime }) => datetime === date)
      const yCoord = item ? item.priceUsd : point.price

      return { date, yCoord, ...point }
    })
    : items.map(point => {
      const date = +new Date(point.datetime)
      return { date, yCoord: point[dataKeys.signal], ...point }
    })
}

export default VisualBacktestChart

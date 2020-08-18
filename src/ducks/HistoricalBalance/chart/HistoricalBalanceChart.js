import React from 'react'
import {
  ComposedChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { capitalizeStr, mergeTimeseriesByKey } from '../../../utils/utils'
import { getDateFormats } from '../../../utils/dates'
import { formatTokensCount } from '../../../utils/formatting'
import ChartTooltip, {
  renderLegend
} from '../../SANCharts/tooltip/CommonChartTooltip'
import {
  generateMetricsMarkup,
  mapDatetimeToNumber
} from '../../SANCharts/utils'
import { usdFormatter } from '../../dataHub/metrics/formatters'
import { getPriceMetricWithSlug } from '../balanceView/utils'
import { getSyncedColors } from '../../Chart/Synchronizer'
import styles from './HistoricalBalanceChart.module.scss'

const formatDatetime = datetime => {
  const { DD, MMM, YY } = getDateFormats(new Date(datetime))
  return `${DD} ${MMM} ${YY}`
}

const formatTooltipDatetime = datetime => {
  const { DD, MMM, YY } = getDateFormats(new Date(datetime))
  return `${MMM} ${DD}, ${YY}`
}

const tooltipValueFormatter = ({ value, key, formatter, payload }) => {
  const priceKeyToken = getPriceMetricWithSlug(key)

  const payloadMappedPrice = payload.find(
    ({ dataKey }) => dataKey === priceKeyToken
  )

  return (
    formatTokensCount(value, key) +
    (payloadMappedPrice ? ' - ' + usdFormatter(payloadMappedPrice.value) : '')
  )
}

const getWalletsLines = (wallets, showYAxes, scale) => {
  const acc = []

  // GarageInc: sometimes, if scale='log' and showYAxes='true' then Y-axis can't be displayed. Bug of recharts

  wallets.forEach((name, index) => {
    acc.push(
      <YAxis
        yAxisId={name}
        hide={!showYAxes}
        tickFormatter={formatTokensCount}
        stroke={COLORS[index]}
        key={name}
        scale={scale}
        type='number'
        dataKey={name}
        domain={['auto', 'dataMax']}
        allowDataOverflow
      />,
      <Line
        type='linear'
        dot={false}
        stroke={COLORS[index]}
        fill={COLORS[index]}
        dataKey={name}
        yAxisId={name}
        name={name}
        key={index}
      />
    )
  })

  return acc
}

const COLORS = ['#14C393', '#8358FF', '#5275FF', '#FF5B5B', '#68DBF4']

const labelFormatter = item => {
  if (item.indexOf('@') !== -1) {
    const parsed = item.split('@')
    return 'Price of ' + parsed[1]
  }

  return capitalizeStr(item)
}

const HistoricalBalanceChart = ({
  walletsData,
  showYAxes = true,
  priceMetricsData = {},
  priceMetric,
  scale
}) => {
  const priceMetricTimeseries = Object.values(priceMetricsData)
  const priceMetricKeys = Object.keys(priceMetricsData)

  const timeseries = Object.keys(walletsData).map(name => {
    if (!walletsData[name]) return []
    return walletsData[name].items.map(({ datetime, balance }) => ({
      datetime,
      [name]: balance
    }))
  })

  if (priceMetricTimeseries && priceMetricTimeseries.length > 0) {
    priceMetricTimeseries.forEach(item => timeseries.push(item))
  }

  const wallets = Object.keys(walletsData)
  const walletsLines = getWalletsLines(wallets, showYAxes, scale)

  const metrics = priceMetricKeys.map((metricDataKey, index) => {
    return {
      ...priceMetric,
      type: priceMetric.type,
      dataKey: metricDataKey,
      color: COLORS[index]
    }
  })

  const syncedColors = getSyncedColors(metrics)
  const priceMetricsLines = priceMetric
    ? generateMetricsMarkup(metrics, { hideYAxis: true, syncedColors })
    : null

  const hideTooltipItem = key => {
    return wallets.indexOf(key) === -1
  }

  const chartData = mapDatetimeToNumber(
    mergeTimeseriesByKey({
      timeseries
    })
  )

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey='datetime'
            minTickGap={100}
            tickFormatter={formatDatetime}
            domain={['dataMin', 'dataMax']}
            type='number'
          />
          <CartesianGrid
            vertical={false}
            strokeDasharray='4 10'
            stroke='#ebeef5'
          />
          <Legend
            verticalAlign='bottom'
            height={36}
            content={renderLegend}
            labelFormatter={labelFormatter}
          />

          {walletsLines}
          {priceMetricsLines}

          <Tooltip
            content={
              <ChartTooltip
                labelFormatter={formatTooltipDatetime}
                valueFormatter={tooltipValueFormatter}
                className={styles.tooltip}
                hideItem={hideTooltipItem}
              />
            }
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalBalanceChart

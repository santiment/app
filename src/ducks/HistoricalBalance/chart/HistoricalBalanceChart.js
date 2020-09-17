import React, { useCallback, useMemo } from 'react'
import cx from 'classnames'
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
  priceMetricTimeseries = [],
  priceMetricKeys = [],
  priceMetric,
  scale,
  classes = {},
  showLegend = true
}) => {
  const timeseries = useMemo(
    () => {
      return Object.keys(walletsData).map(name => {
        if (!walletsData[name]) return []
        return walletsData[name].items.map(({ datetime, balance }) => ({
          datetime,
          [name]: balance
        }))
      })
    },
    [walletsData]
  )

  const wallets = Object.keys(walletsData)
  const walletsLines = getWalletsLines(wallets, showYAxes, scale)

  const metrics = useMemo(
    () => {
      return priceMetricKeys.map((metricDataKey, index) => {
        return {
          ...priceMetric,
          type: priceMetric.type,
          dataKey: metricDataKey,
          color: COLORS[index]
        }
      })
    },
    [priceMetricKeys, priceMetric, COLORS]
  )

  const syncedColors = getSyncedColors(metrics)
  const priceMetricsLines = useMemo(
    () => {
      return priceMetric
        ? generateMetricsMarkup(metrics, { hideYAxis: true, syncedColors })
        : null
    },
    [metrics, syncedColors, priceMetric]
  )

  const hideTooltipItem = useCallback(
    key => {
      return wallets.indexOf(key) === -1
    },
    [wallets]
  )

  const chartData = useMemo(
    () => {
      const newTimeseries = [...timeseries, priceMetricTimeseries]
      return mapDatetimeToNumber(
        mergeTimeseriesByKey({
          timeseries: newTimeseries
        })
      )
    },
    [timeseries, priceMetricTimeseries]
  )

  return (
    <div className={cx(styles.chartContainer, classes.chart)}>
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
          {showLegend && (
            <Legend
              verticalAlign='bottom'
              height={36}
              content={renderLegend}
              labelFormatter={labelFormatter}
            />
          )}

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

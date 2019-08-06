import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import Gradients from '../../components/WatchlistOverview/Gradients'
import { formatNumber } from './../../utils/formatting'
import { getDateFormats } from '../../utils/dates'
import { generateMetricsMarkup, Metrics } from '../../ducks/SANCharts/utils.js'
import styles from './MobileAssetChart.module.scss'

const labelFormatter = date => {
  const { dddd, MMM, DD, YYYY } = getDateFormats(new Date(date))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

const tickFormatter = date => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const MobileAssetChart = ({ data, slug: asset, icoPrice, extraMetric }) => {
  const metrics = ['historyPricePreview']
  if (extraMetric) metrics.push(extraMetric.name)
  const markup = generateMetricsMarkup(metrics)
  return (
    <div>
      <ResponsiveContainer width='100%' height={250}>
        <ComposedChart data={data}>
          <defs>
            <Gradients />
          </defs>
          <XAxis
            dataKey='datetime'
            tickLine={false}
            tickMargin={5}
            minTickGap={100}
            tickFormatter={tickFormatter}
            tick={false}
            hide
          />
          <YAxis hide domain={['auto', 'dataMax']} />
          <Tooltip
            labelFormatter={labelFormatter}
            formatter={(value, name) => {
              if (name === `${asset}/USD`) {
                return formatNumber(value, { currency: 'USD' })
              }
              return value
            }}
          />
          {markup}
          {extraMetric &&
            extraMetric.anomalies.map(({ datetime }) => (
              <ReferenceLine
                key={datetime}
                yAxisId={`axis-${Metrics[extraMetric.name].dataKey ||
                  extraMetric.name}`}
                x={datetime}
                stroke='red'
              />
            ))}
          {icoPrice && (
            <ReferenceLine
              strokeDasharray='3 3'
              stroke='var(--mirage)'
              yAxisId='axis-priceUsd'
              y={icoPrice}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      {icoPrice && (
        <div className={styles.icoPrice}>
          {`ICO Price ${formatNumber(icoPrice, { currency: 'USD' })}`}
          <div className={styles.icoPriceLegend} />
        </div>
      )}
    </div>
  )
}

export default MobileAssetChart

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
  console.log(extraMetric && Metrics[extraMetric.metric])
  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <ComposedChart data={data}>
          <XAxis
            dataKey='datetime'
            tickLine={false}
            tickMargin={5}
            minTickGap={100}
            tickFormatter={tickFormatter}
          />
          <YAxis
            yAxisId='axis-price'
            mirror
            axisLine={false}
            domain={['dataMin', 'auto']}
            tickFormatter={priceUsd =>
              formatNumber(priceUsd, { currency: 'USD' })
            }
          />
          <CartesianGrid vertical={false} stroke='#ebeef5' />
          <Tooltip
            labelFormatter={labelFormatter}
            formatter={(value, name) => {
              if (name === `${asset}/USD`) {
                return formatNumber(value, { currency: 'USD' })
              }
              return value
            }}
          />
          <Line
            type='linear'
            yAxisId='axis-price'
            name={asset + '/USD'}
            dot={false}
            strokeWidth={1.5}
            dataKey='priceUsd'
            stroke='var(--jungle-green)'
          />
          {extraMetric && generateMetricsMarkup([extraMetric.metric])}
          {extraMetric &&
            extraMetric.anomalies.map(({ datetime }) => (
              <ReferenceLine
                key={datetime}
                yAxisId={`axis-${Metrics[extraMetric.metric].dataKey ||
                  extraMetric.metric}`}
                x={datetime}
                stroke='red'
              />
            ))}
          {icoPrice && (
            <ReferenceLine
              yAxisId='axis-price'
              strokeDasharray='3 3'
              stroke='black'
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

import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot
} from 'recharts'
import Gradients from '../../../components/WatchlistOverview/Gradients'
import { formatNumber } from '../../../utils/formatting'
import {
  Metrics,
  generateMetricsMarkup
} from '../../../ducks/SANCharts/utils.js'
import CustomTooltip from '../../../ducks/SANCharts/CustomTooltip'
import styles from './MobileAssetChart.module.scss'

const MobileAssetChart = ({ data, slug: asset, icoPrice, extraMetric }) => {
  const metrics = ['historyPricePreview']
  if (extraMetric) metrics.push(extraMetric.name)
  const markup = generateMetricsMarkup(metrics.map(metric => Metrics[metric]))

  let anomalyDataKey, anomalies
  if (extraMetric) {
    anomalyDataKey =
      Metrics[extraMetric.name].dataKey || Metrics[extraMetric.name].key
    anomalies = extraMetric.anomalies.map(anomaly => {
      const el = data.find(item => item.datetime === anomaly.datetime)
      if (el) {
        return {
          ...anomaly,
          yCoord: el[anomalyDataKey]
        }
      }
      return anomaly
    })
  }
  return (
    <div>
      <ResponsiveContainer width='100%' height={250}>
        <ComposedChart data={data}>
          <defs>
            <Gradients />
          </defs>
          <XAxis dataKey='datetime' tickLine={false} tick={false} hide />
          <YAxis
            hide
            domain={['auto', 'dataMax']}
            dataKey={extraMetric ? anomalyDataKey : 'priceUsd'}
          />
          <Tooltip
            content={<CustomTooltip />}
            position={{ x: 0, y: -20 }}
            isAnimationActive={false}
          />
          {markup}
          {extraMetric &&
            anomalies.map(({ datetime, yCoord }) => (
              <ReferenceDot
                key={datetime}
                y={yCoord}
                x={datetime}
                ifOverflow='extendDomain'
                r={3}
                isFront
                stroke='var(--white)'
                strokeWidth='2px'
                fill='var(--persimmon)'
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

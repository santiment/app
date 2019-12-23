import React, { useEffect } from 'react'
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
import { generateMetricsMarkup } from '../../../ducks/SANCharts/utils'
import {
  getSyncedColors,
  clearCache
} from '../../../ducks/SANCharts/TooltipSynchronizer'
import { Metrics } from '../../../ducks/SANCharts/data'
import CustomTooltip from '../../../ducks/SANCharts/CustomTooltip'
import IcoPriceTooltip from '../../../ducks/SANCharts/tooltip/IcoPriceTooltip'

const MobileAssetChart = ({
  data,
  slug: asset,
  icoPrice,
  extraMetric,
  setIcoPricePos,
  icoPricePos
}) => {
  const metrics = ['historyPricePreview']
  if (extraMetric) metrics.push(extraMetric.name)
  const objMetrics = metrics.map(metric => Metrics[metric])
  const syncedColors = getSyncedColors(objMetrics)
  const markup = generateMetricsMarkup(objMetrics, { syncedColors })

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

  useEffect(() => clearCache)
  return (
    <div>
      {icoPrice && <IcoPriceTooltip y={icoPricePos} value={icoPrice} />}
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
              strokeDasharray='5 5'
              stroke='var(--waterloo)'
              yAxisId='axis-priceUsd'
              y={icoPrice}
              label={({ viewBox: { y } }) => setIcoPricePos(y)}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MobileAssetChart

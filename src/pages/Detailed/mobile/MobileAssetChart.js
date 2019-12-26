import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot
} from 'recharts'
import throttle from 'lodash.throttle'
import Gradients from '../../../components/WatchlistOverview/Gradients'
import { tooltipLabelFormatter } from '../../../ducks/SANCharts/CustomTooltip'
import { generateMetricsMarkup } from '../../../ducks/SANCharts/utils'
import {
  getSyncedColors,
  clearCache
} from '../../../ducks/SANCharts/TooltipSynchronizer'
import { Metrics } from '../../../ducks/SANCharts/data'
import CommonChartTooltip from '../../../ducks/SANCharts/tooltip/CommonChartTooltip'
import IcoPriceTooltip from '../../../ducks/SANCharts/tooltip/IcoPriceTooltip'
import styles from './MobileAssetChart.module.scss'

const MobileAssetChart = ({
  data = [],
  slug: asset,
  icoPrice,
  extraMetric,
  setIcoPricePos,
  icoPricePos
}) => {
  const [isTouch, setIsTouch] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const metrics = ['historyPricePreview']
  if (extraMetric) metrics.push(extraMetric.name)
  const objMetrics = metrics.map(metric => Metrics[metric])
  const syncedColors = getSyncedColors(objMetrics)
  const markup = generateMetricsMarkup(objMetrics, {
    syncedColors,
    useShortName: true,
    activeLineDataKey: 'priceUsd',
    showActiveDot: false
  })

  const chartMediumIndex = data.length / 2

  const hideTooltipItem = key => key === 'priceUsd'

  const setCurrentIndex = throttle(
    evt => setActiveIndex(evt.activeTooltipIndex),
    1000
  )

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
    <div
      onTouchStart={() => setIsTouch(true)}
      onTouchEnd={() => setIsTouch(false)}
      onTouchCancel={() => setIsTouch(false)}
    >
      {icoPricePos && !isTouch && (
        <IcoPriceTooltip y={icoPricePos} value={icoPrice} />
      )}
      <ResponsiveContainer width='100%' aspect={1.5 / 1.0}>
        <ComposedChart data={data} onMouseMove={setCurrentIndex}>
          <defs>
            <Gradients />
          </defs>
          <XAxis dataKey='datetime' hide />
          <YAxis
            hide
            domain={['auto', 'dataMax']}
            dataKey={extraMetric ? anomalyDataKey : 'priceUsd'}
          />
          {isTouch && (
            <Tooltip
              withLabel={false}
              wrapperStyle={{
                right: `${activeIndex < chartMediumIndex ? '5px' : 'auto'}`
              }}
              cursor={{ stroke: 'var(--casper)' }}
              className={styles.tooltip}
              hideItem={hideTooltipItem}
              labelFormatter={tooltipLabelFormatter}
              content={<CommonChartTooltip />}
              position={{ x: 4, y: 2 }}
              isAnimationActive={false}
            />
          )}
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
          {icoPrice && !isTouch && (
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

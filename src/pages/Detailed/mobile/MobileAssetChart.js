import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
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
import MobilePriceTooltip from '../../../ducks/SANCharts/tooltip/MobilePriceTooltip'
import IcoPriceTooltip from '../../../ducks/SANCharts/tooltip/IcoPriceTooltip'
import styles from './MobileAssetChart.module.scss'

const MobileAssetChart = ({
  data = [],
  slug: asset,
  icoPrice,
  extraMetrics = [],
  setIcoPricePos,
  icoPricePos,
  chartHeight,
  isLandscapeMode,
  ...props
}) => {
  const [isTouch, setIsTouch] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const metrics = ['historyPricePreview']
  extraMetrics.forEach(({ key }) => metrics.push(key))
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
    evt => setActiveIndex(evt ? evt.activeTooltipIndex : null),
    500
  )

  let anomalyDataKey, anomalies

  useEffect(() => clearCache)
  return (
    <div
      onTouchStart={() => setIsTouch(true)}
      onTouchEnd={() => setIsTouch(false)}
      onTouchCancel={() => setIsTouch(false)}
    >
      {icoPrice && icoPricePos !== null && !isTouch && (
        <IcoPriceTooltip y={icoPricePos} value={icoPrice} />
      )}
      <ResponsiveContainer width='100%' height={chartHeight}>
        <ComposedChart
          data={data}
          onMouseMove={setCurrentIndex}
          margin={{ left: 0, right: 0 }}
        >
          <defs>
            <Gradients />
          </defs>
          <XAxis dataKey='datetime' hide />
          <YAxis
            hide
            domain={[
              dataMin => {
                if (isFinite(dataMin) && icoPrice - dataMin < 0) {
                  setIcoPricePos(0)
                }

                return dataMin
              },
              dataMax => {
                if (isFinite(dataMax) && icoPrice - dataMax > 0) {
                  setIcoPricePos(0)
                }

                return dataMax
              }
            ]}
            dataKey={'priceUsd'}
          />
          {isTouch && (
            <Tooltip
              isAnimationActive={false}
              cursor={{ stroke: 'var(--casper)' }}
              position={{ x: 0, y: isLandscapeMode ? -49 : -62.5 }}
              content={props => (
                <>
                  <MobilePriceTooltip
                    {...props}
                    labelFormatter={tooltipLabelFormatter}
                  />
                  <CommonChartTooltip
                    {...props}
                    withLabel={false}
                    className={cx(
                      styles.tooltip,
                      activeIndex < chartMediumIndex && styles.rightAlign
                    )}
                    hideItem={hideTooltipItem}
                  />
                </>
              )}
            />
          )}
          {markup}
          {icoPrice && (
            <ReferenceLine
              strokeDasharray='5 5'
              stroke={isTouch ? 'transparent' : 'var(--waterloo)'}
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

const mapSizesToProps = ({ width, height }) => ({
  chartHeight: (width > height ? height : width) / 2,
  isLandscapeMode: width > height
})

export default withSizes(mapSizesToProps)(MobileAssetChart)

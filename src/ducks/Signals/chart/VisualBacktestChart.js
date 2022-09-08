import React, { useMemo } from 'react'
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts'
import cx from 'classnames'
import Gradients from '../../../components/Gradients'
import { generateMetricsMarkup } from '../../SANCharts/utils'
import CustomTooltip from './../../SANCharts/CustomTooltip'
import { useChartColors } from '../../Chart/colors'
import { ActiveDot } from '../../SANCharts/tooltip/ActiveLine'
import chartStyles from './../../SANCharts/Chart.module.scss'
import sharedStyles from './../../SANCharts/ChartPage.module.scss'
import styles from './preview/SignalPreview.module.scss'

export function GetReferenceDots(signals, yAxisId) {
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

const RenderChart = ({
  data,
  dataKeys: { key, dataKey = key },
  markup,
  referenceDots,
  classes,
  gradientParams = {},
  height,
  hideTooltip,
}) => {
  return (
    <ResponsiveContainer width='100%' height={height}>
      <ComposedChart data={data} margin={{ left: 0, right: 0, top: 16 }}>
        <defs>
          <Gradients {...gradientParams} />
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
        <YAxis hide domain={['auto', 'dataMax']} dataKey={dataKey} interval='preserveStartEnd' />

        {markup}

        {referenceDots}

        {!hideTooltip && (
          <Tooltip
            content={<CustomTooltip classes={classes} />}
            cursor={false}
            position={{ x: 12, y: -22 }}
            isAnimationActive={false}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

const VisualBacktestChart = ({
  triggeredSignals,
  metrics,
  label,
  data,
  dataKeys,
  referenceDots,
  showTitle,
  height = 120,
  classes = {},
  metricsColor,
  activeDotColor,
  gradientParams = {},
  activeEl = ActiveDot,
  hideTooltip,
}) => {
  const colors = useChartColors(metrics, metricsColor)
  const markup = useMemo(
    () =>
      generateMetricsMarkup(metrics, {
        syncedColors: colors,
        activeDotEl: activeEl,
        hideYAxis: true,
        activeDotColor,
      }),
    [metrics, colors, activeEl],
  )

  const titleEnabled = showTitle && triggeredSignals && triggeredSignals.length > 0

  return (
    <div className={styles.preview}>
      {titleEnabled && (
        <div className={styles.description}>
          <span className={styles.fired}>Alert was fired:</span>
          <span className={styles.times}>
            {triggeredSignals.length} times in {label}
          </span>
        </div>
      )}
      {data.length > 0 ? (
        <div className={styles.chartBlock}>
          <div className={styles.chart}>
            <div
              className={cx(
                chartStyles.wrapper,
                sharedStyles.chart,
                styles.wrapper,
                !titleEnabled && styles.noTitle,
              )}
            >
              <RenderChart
                data={data}
                dataKeys={dataKeys}
                markup={markup}
                referenceDots={referenceDots}
                classes={classes}
                gradientParams={gradientParams}
                height={height}
                hideTooltip={hideTooltip}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  )
}

export default VisualBacktestChart

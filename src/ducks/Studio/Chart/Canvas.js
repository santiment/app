import React from 'react'
import Insights from './Insights'
import IcoPrice from './IcoPrice'
import LastDayPrice from './LastDayPrice'
import ResponsiveChart from '../../Chart/Responsive'
import Lines from '../../Chart/Lines'
import Bars from '../../Chart/Bars'
import GreenRedBars from '../../Chart/GreenRedBars'
import Tooltip from '../../Chart/Tooltip'
import Axes from '../../Chart/Axes'
import CartesianGrid from '../../Chart/CartesianGrid'
import { useAxesMetricsKey } from '../../Chart/hooks'
import Watermark from '../../Chart/Watermark'
import Brush from '../../Chart/Brush'
import Signals from '../../Chart/Signals'
import styles from './index.module.scss'

const PADDING = {
  top: 10,
  right: 50,
  bottom: 73,
  left: 5
}

const DOUBLE_AXIS_PADDING = {
  ...PADDING,
  left: 50
}

const Canvas = ({
  data,
  brushData,
  metrics,
  settings,
  options,
  isDomainGroupingActive,
  isICOPriceActive,
  isSelectingRange,
  syncTooltips,
  onBrushChangeEnd,
  onPointClick,
  onRangeSelect,
  onRangeSelectStart,
  setIsICOPriceDisabled,
  ...props
}) => {
  const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive)
  const { from, to } = settings
  const { isCartesianGridActive, isWatermarkLighter } = options

  return (
    <ResponsiveChart
      padding={axesMetricKeys[1] ? DOUBLE_AXIS_PADDING : PADDING}
      {...props}
      data={data}
    >
      <Watermark light={isWatermarkLighter} />
      <GreenRedBars />
      <Bars />
      <Lines />
      <Axes metrics={axesMetricKeys} />
      {isCartesianGridActive && <CartesianGrid />}

      <Tooltip
        metric={axesMetricKeys[0]}
        syncTooltips={syncTooltips}
        onPointClick={onPointClick}
        onRangeSelect={onRangeSelect}
        onRangeSelectStart={onRangeSelectStart}
      />

      <Brush
        {...props}
        data={brushData}
        from={from}
        to={to}
        onChangeEnd={onBrushChangeEnd}
      />

      <Insights />
      <IcoPrice
        {...settings}
        isICOPriceActive={isICOPriceActive}
        metrics={metrics}
        className={styles.ico}
        onResult={price => setIsICOPriceDisabled(!price)}
      />
      <LastDayPrice settings={settings} metrics={metrics} scale={props.scale} />
      {isSelectingRange || (
        <Signals {...settings} metrics={metrics} data={data} />
      )}
    </ResponsiveChart>
  )
}

export default Canvas

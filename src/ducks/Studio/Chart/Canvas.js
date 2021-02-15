import React from 'react'
import Insights from './Insights'
import IcoPrice from './IcoPrice'
import LastDayPrice from './LastDayPrice'
import ResponsiveChart from '../../Chart/Responsive'
import Areas from '../../Chart/Areas'
import Lines from '../../Chart/Lines'
import Bars from '../../Chart/Bars'
import GreenRedBars from '../../Chart/GreenRedBars'
import Tooltip from '../../Chart/Tooltip'
import Drawer from '../../Chart/Drawer'
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
  cursorType,
  drawings,
  selectedLineState,
  isDrawingState,
  isNewDrawingState,
  isDomainGroupingActive,
  isICOPriceActive,
  isSelectingRange,
  syncTooltips,
  onBrushChangeEnd,
  onPointMouseUp,
  onRangeSelected,
  onRangeSelecting,
  setIsICOPriceDisabled,
  ...props
}) => {
  const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive)
  const isDrawing = isDrawingState[0]
  const { from, to } = settings
  const { isCartesianGridActive, isWatermarkLighter, showWatermark } = options

  return (
    <ResponsiveChart
      padding={axesMetricKeys[1] ? DOUBLE_AXIS_PADDING : PADDING}
      {...props}
      data={data}
    >
      <Watermark light={isWatermarkLighter} show={showWatermark} />
      <GreenRedBars />
      <Bars />
      <Areas />
      <Lines />
      <Axes metrics={axesMetricKeys} />
      {isCartesianGridActive && <CartesianGrid />}

      <Drawer
        metricKey={axesMetricKeys[0]}
        data={data}
        drawings={drawings}
        selectedLineState={selectedLineState}
        isDrawingState={isDrawingState}
        isNewDrawingState={isNewDrawingState}
      />

      <Tooltip
        metric={axesMetricKeys[0]}
        syncTooltips={syncTooltips}
        cursorType={cursorType}
        onPointMouseUp={onPointMouseUp}
        onRangeSelected={onRangeSelected}
        onRangeSelecting={onRangeSelecting}
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
      <LastDayPrice data={data} from={from} to={to} />
      {isNewDrawingState[0] || isDrawing || isSelectingRange || (
        <Signals {...settings} metrics={metrics} data={data} />
      )}
    </ResponsiveChart>
  )
}

export default Canvas

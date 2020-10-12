import React from 'react'
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

const PADDING = {
  top: 10,
  right: 50,
  bottom: 73,
  left: 5
}

const Canvas = ({
  data,
  brushData,
  metrics,
  settings,
  options,
  isDomainGroupingActive,
  syncTooltips,
  onBrushChangeEnd,
  onPointClick,
  onRangeSelect,
  onRangeSelectStart,
  ...props
}) => {
  const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive)
  const { from, to } = settings
  const {
    isCartesianGridActive,
    isWatermarkLighter,
    isICOPriceActive
  } = options

  return (
    <ResponsiveChart padding={PADDING} {...props} data={data}>
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

      {/* <IcoPrice
          {...settings}
          isICOPriceActive={isICOPriceActive}
          metrics={metrics}
          className={styles.ico}
          onResult={(price) => setIsICOPriceDisabled(!price)}
          />
          <LastDayPrice settings={settings} metrics={metrics} />
          {isSelectingRange || <Signals {...settings} metrics={metrics} />}
          <Insights />
        */}
    </ResponsiveChart>
  )
}

export default Canvas

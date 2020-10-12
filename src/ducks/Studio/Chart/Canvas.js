import React from 'react'
import ResponsiveChart from '../../Chart/Responsive'
import Lines from '../../Chart/Lines'
import Bars from '../../Chart/Bars'
import Tooltip from '../../Chart/Tooltip'
import Axes from '../../Chart/Axes'
import CartesianGrid from '../../Chart/CartesianGrid'
import { useDomainGroups, useAxesMetricsKey } from '../../Chart/hooks'
/* import Watermark from '../../Chart/Watermark' */
import Brush from '../../Chart/Brush'

const PADDING = {
  top: 10,
  right: 50,
  /* bottom: 18, */
  bottom: 40 + 33,
  left: 5
}

const Canvas = ({
  metrics,
  settings,

  data,
  brushData,

  isDomainGroupingActive,
  isICOPriceActive,
  isCartesianGridActive,
  onBrushChangeEnd,
  ...props
}) => {
  const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive)
  const { from, to } = settings

  return (
    <ResponsiveChart padding={PADDING} {...props} data={data}>
      {/* <Watermark /> */}
      <Bars />
      <Lines />
      <Axes metrics={axesMetricKeys} />
      <Tooltip metric={axesMetricKeys[0]} />
      {isCartesianGridActive && <CartesianGrid />}

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

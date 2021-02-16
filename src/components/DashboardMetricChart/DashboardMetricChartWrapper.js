import React from 'react'
import withSizes from 'react-sizes'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import {
  useAxesMetricsKey,
  useClosestValueData,
  useEdgeGaps
} from '../../ducks/Chart/hooks'
import { mapSizesToProps } from '../../utils/withSizes'
import SANChart from '../../ducks/Chart/Modular'
import Areas from '../../ducks/Chart/Areas'
import Lines from '../../ducks/Chart/Lines'
import CartesianGrid from '../../ducks/Chart/CartesianGrid'
import Axes from '../../ducks/Chart/Axes'
import Tooltip from '../../ducks/Chart/Tooltip'
import Bars from '../../ducks/Chart/Bars'
import { useResponsiveTicks } from '../../ducks/HistoricalBalance/Chart/Canvas'
import Brush from '../../ducks/Chart/Brush'
import Watermark from '../../ducks/Chart/Watermark'
import styles from './DashboardMetricChartWrapper.module.scss'

const CHART_PADDING_DESKTOP = {
  top: 16,
  right: 40,
  bottom: 73,
  left: 0
}
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const DashboardMetricChartWrapper = ({
  settings,
  data: rawData,
  metrics,
  isDesktop,
  MetricColor,
  isDomainGroupingActive,
  loadings,
  onBrushChangeEnd,
  allTimeData,
  domainGroups,
  axesMetricKeysDefault,
  mirrorDomainGroups,
  sliceMetricsCount = 1,
  chartRef,
  options
}) => {
  const categories = useMetricCategories(metrics)

  const axesMetricKeys =
    axesMetricKeysDefault ||
    useAxesMetricsKey(metrics, isDomainGroupingActive).slice(
      0,
      sliceMetricsCount
    )
  const data = useEdgeGaps(
    useClosestValueData(rawData, metrics, options.isClosestDataActive)
  )
  const axesTicks = useResponsiveTicks(!isDesktop)

  return (
    <Canvas
      className={styles.chart}
      settings={settings}
      categories={categories}
      chartRef={chartRef}
      data={data}
      brushData={allTimeData}
      showBrush={isDesktop && onBrushChangeEnd && allTimeData}
      onBrushChangeEnd={onBrushChangeEnd}
      metrics={metrics}
      padding={isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE}
      resizeDependencies={[]}
      colors={MetricColor}
      tooltipKey={axesMetricKeys[0]}
      axesMetricKeys={axesMetricKeys}
      axesTicks={axesTicks}
      domainGroups={isDomainGroupingActive ? domainGroups : mirrorDomainGroups}
      isLoading={loadings.length > 0}
      scale={options.isLogScale ? logScale : linearScale}
      options={options}
    />
  )
}

const Canvas = ({
  metrics,
  axesTicks,
  isLoading,
  brushData,
  onBrushChangeEnd,
  settings,
  axesMetricKeys,
  options,
  ...props
}) => {
  const { from, to } = settings
  const {
    isWatermarkVisible,
    isWatermarkLighter,
    isCartesianGridActive
  } = options

  return (
    <SANChart height={400} {...props}>
      {isWatermarkVisible && <Watermark light={isWatermarkLighter} />}
      <Areas />
      <Bars />
      <Lines />
      {isCartesianGridActive && <CartesianGrid />}

      <Axes metrics={axesMetricKeys} {...axesTicks} />
      <Tooltip metric={axesMetricKeys[0]} />

      <Brush
        {...props}
        data={brushData}
        from={from}
        to={to}
        onChangeEnd={onBrushChangeEnd}
      />
    </SANChart>
  )
}

export default withSizes(mapSizesToProps)(DashboardMetricChartWrapper)

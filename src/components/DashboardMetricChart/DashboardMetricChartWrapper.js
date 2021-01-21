import React from 'react'
import withSizes from 'react-sizes'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useAxesMetricsKey } from '../../ducks/Chart/hooks'
import Chart from '../../ducks/Chart'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './DashboardMetricChartWrapper.module.scss'

const CHART_HEIGHT = 400
const CHART_PADDING_DESKTOP = {
  top: 16,
  right: 40,
  bottom: 16,
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
  data,
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
  isCartesianGridActive = false,
  sliceMetricsCount = 1
}) => {
  const categories = useMetricCategories(metrics)

  const axesMetricKeys =
    axesMetricKeysDefault ||
    useAxesMetricsKey(metrics, isDomainGroupingActive).slice(
      0,
      sliceMetricsCount
    )

  return (
    <Chart
      {...settings}
      {...categories}
      className={styles.chart}
      data={data}
      brushData={allTimeData}
      hideBrush={!isDesktop || !onBrushChangeEnd || !allTimeData}
      onBrushChangeEnd={onBrushChangeEnd}
      chartHeight={CHART_HEIGHT}
      metrics={metrics}
      isCartesianGridActive={isCartesianGridActive}
      chartPadding={isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE}
      resizeDependencies={[]}
      MetricColor={MetricColor}
      tooltipKey={axesMetricKeys[0]}
      axesMetricKeys={axesMetricKeys}
      domainGroups={isDomainGroupingActive ? domainGroups : mirrorDomainGroups}
      isLoading={loadings.length > 0}
    />
  )
}

export default withSizes(mapSizesToProps)(DashboardMetricChartWrapper)

import React from 'react'
import withSizes from 'react-sizes'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useAxesMetricsKey, useDomainGroups } from '../../ducks/Chart/hooks'
import Chart from '../../ducks/Chart'
import { mapSizesToProps } from '../../utils/withSizes'

const CHART_HEIGHT = 400
const CHART_PADDING_DESKTOP = {
  top: 32,
  right: 64,
  bottom: 32,
  left: 24
}
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const DashboardChartWrapper = ({
  settings,
  data,
  metrics,
  isDesktop,
  MetricColor,
  isDomainGroupingActive,
  loadings
}) => {
  const categories = useMetricCategories(metrics)

  const axesMetricKeys = useAxesMetricsKey(
    metrics,
    isDomainGroupingActive
  ).slice(0, 1)

  const domainGroups = useDomainGroups(metrics)

  return (
    <Chart
      {...settings}
      {...categories}
      data={data}
      chartHeight={CHART_HEIGHT}
      metrics={metrics}
      isCartesianGridActive={false}
      hideWatermark
      hideBrush
      chartPadding={isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE}
      resizeDependencies={[]}
      MetricColor={MetricColor}
      tooltipKey={axesMetricKeys[0]}
      axesMetricKeys={axesMetricKeys}
      domainGroups={isDomainGroupingActive ? domainGroups : undefined}
      isLoading={loadings.length > 0}
    />
  )
}

export default withSizes(mapSizesToProps)(DashboardChartWrapper)

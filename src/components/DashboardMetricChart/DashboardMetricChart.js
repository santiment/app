import React, { useCallback, useEffect, useState } from 'react'
import withSizes from 'react-sizes'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useAxesMetricsKey, useDomainGroups } from '../../ducks/Chart/hooks'
import cx from 'classnames'
import DashboardChartHeader, {
  DashboardIntervals
} from './DashboardChartHeader/DashboardChartHeader'
import SharedAxisToggle from '../../ducks/Studio/Chart/SharedAxisToggle'
import { DesktopOnly } from '../Responsive'
import Chart from '../../ducks/Chart'
import { mapSizesToProps } from '../../utils/withSizes'
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings'
import { useChartColors } from '../../ducks/Chart/colors'
import { DEFAULT_INTERVAL_SELECTORS, INTERVAL_30_DAYS } from './utils'
import styles from './DashboardMetricChart.module.scss'

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

const DashboardMetricChart = ({
  className,
  isDesktop,
  metrics,
  metricSettingsMap,
  defaultInterval = INTERVAL_30_DAYS,
  intervals = DEFAULT_INTERVAL_SELECTORS
}) => {
  useEffect(
    () => {
      updateTooltipSettings(metrics)
    },
    [metrics]
  )

  const [settings, setSettings] = useState({
    ...defaultInterval.requestParams
  })
  const [intervalSelector, setIntervalSelector] = useState(defaultInterval)

  const [data, loadings] = useTimeseries(metrics, settings, metricSettingsMap)
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const categories = useMetricCategories(metrics)

  const axesMetricKeys = useAxesMetricsKey(
    metrics,
    isDomainGroupingActive
  ).slice(0, 1)

  const MetricColor = useChartColors(metrics)
  const domainGroups = useDomainGroups(metrics)

  const onChangeInterval = useCallback(
    value => {
      setSettings(data => {
        return { ...data, ...value.requestParams }
      })
      setIntervalSelector(value)
    },
    [setSettings, setIntervalSelector]
  )

  return (
    <div className={cx(styles.container, className)}>
      <DashboardChartHeader>
        <SharedAxisToggle
          isDomainGroupingActive={isDomainGroupingActive}
          setIsDomainGroupingActive={setIsDomainGroupingActive}
          className={styles.sharedAxisToggle}
        />
        <DesktopOnly>
          <DashboardIntervals
            interval={intervalSelector}
            setInterval={onChangeInterval}
            intervals={intervals}
          />
        </DesktopOnly>
      </DashboardChartHeader>

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
    </div>
  )
}

export default withSizes(mapSizesToProps)(DashboardMetricChart)

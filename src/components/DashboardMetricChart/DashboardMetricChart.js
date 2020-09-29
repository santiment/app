import React, { useCallback, useEffect, useMemo, useState } from 'react'
import withSizes from 'react-sizes'
import cx from 'classnames'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useAxesMetricsKey, useDomainGroups } from '../../ducks/Chart/hooks'
import DashboardChartHeader, {
  DashboardIntervals
} from './DashboardChartHeader/DashboardChartHeader'
import SharedAxisToggle from '../../ducks/Studio/Chart/SharedAxisToggle'
import { DesktopOnly, MobileOnly } from '../Responsive'
import Chart from '../../ducks/Chart'
import { mapSizesToProps } from '../../utils/withSizes'
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings'
import { useChartColors } from '../../ducks/Chart/colors'
import { DEFAULT_INTERVAL_SELECTORS, INTERVAL_30_DAYS } from './utils'
import DashboardChartMetrics from './DashboardChartMetrics/DashboardChartMetrics'
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
  const [disabledMetrics, setDisabledMetrics] = useState({})

  const onChangeInterval = useCallback(
    value => {
      setSettings(data => {
        return { ...data, ...value.requestParams }
      })
      setIntervalSelector(value)
    },
    [setSettings, setIntervalSelector]
  )

  const filteredMetrics = useMemo(
    () => metrics.filter(({ key }) => !disabledMetrics[key]),
    [metrics, disabledMetrics]
  )

  const [data, loadings] = useTimeseries(
    filteredMetrics,
    settings,
    metricSettingsMap
  )
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const categories = useMetricCategories(filteredMetrics)

  const axesMetricKeys = useAxesMetricsKey(
    filteredMetrics,
    isDomainGroupingActive
  ).slice(0, 1)

  const MetricColor = useChartColors(filteredMetrics)
  const domainGroups = useDomainGroups(filteredMetrics)

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

      <DesktopOnly>
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledMetrics}
          disabledMetrics={disabledMetrics}
          colors={MetricColor}
        />
      </DesktopOnly>

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

      <MobileOnly>
        <DashboardIntervals
          interval={intervalSelector}
          setInterval={onChangeInterval}
          intervals={intervals}
        />
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledMetrics}
          disabledMetrics={disabledMetrics}
          colors={MetricColor}
        />
      </MobileOnly>
    </div>
  )
}

export default withSizes(mapSizesToProps)(DashboardMetricChart)

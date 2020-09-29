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
import styles from './DashboardMetricChart.module.scss'
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings'
import { useChartColors } from '../../ducks/Chart/colors'
import { CRYPTO_ERA_START_DATE } from '../../utils/dates'

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

export const makeIntervalSelectors = ({
  val,
  label,
  interval = '1d',
  from
}) => ({
  value: val,
  label: label,
  requestParams: {
    from: from || `utc_now-${val}`,
    to: `utc_now`,
    interval
  }
})

export const makeMetric = (key, label) => {
  return {
    key,
    label
  }
}

export const INTERVAL_30_DAYS = makeIntervalSelectors({
  val: '30d',
  label: '1M',
  interval: '3h'
})

export const DEFAULT_INTERVAL_SELECTORS = [
  makeIntervalSelectors({ val: '1d', label: '1D', interval: '15m' }),
  makeIntervalSelectors({ val: '1w', label: '1W', interval: '1h' }),
  INTERVAL_30_DAYS,
  makeIntervalSelectors({ val: '90d', label: '3M', interval: '8h' }),
  makeIntervalSelectors({ val: '183d', label: '6m', interval: '1d' }),
  makeIntervalSelectors({
    label: 'All',
    interval: '1d',
    from: CRYPTO_ERA_START_DATE
  })
]

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

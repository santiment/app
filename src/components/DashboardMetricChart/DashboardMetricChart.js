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

export const makeInterval = (val, label, interval = '1d') => ({
  value: val,
  label: label,
  requestParams: {
    from: `utc_now-${val}`,
    to: `utc_now`,
    interval
  }
})

export const INTERVAL_30_DAYS = makeInterval('30d', '1M', '3h')

const allDays = Math.round(
  Math.abs(CRYPTO_ERA_START_DATE - new Date()) / (1000 * 60 * 60 * 24)
)

export const DEFAULT_INTERVALS = [
  makeInterval('1d', '1D', '15m'),
  makeInterval('1w', '1W', '1h'),
  INTERVAL_30_DAYS,
  makeInterval('90d', '3M', '8h'),
  makeInterval('183d', '6m', '1d'),
  makeInterval(`${allDays}d`, 'All', '1d')
]

const DashboardMetricChart = ({
  className,
  isDesktop,
  metrics,
  defaultSettings = {},
  intervals = DEFAULT_INTERVALS
}) => {
  useEffect(
    () => {
      updateTooltipSettings(metrics)
    },
    [metrics]
  )

  const [settings, setSettings] = useState(defaultSettings)
  const { interval } = settings

  const [data, loadings] = useTimeseries(metrics, settings)
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const categories = useMetricCategories(metrics)

  const axesMetricKeys = useAxesMetricsKey(
    metrics,
    isDomainGroupingActive
  ).slice(0, 1)

  const MetricColor = useChartColors(metrics)
  const domainGroups = useDomainGroups(metrics)

  const setInterval = useCallback(
    value => {
      setSettings(data => {
        return { ...data, ...value.requestParams }
      })
    },
    [setSettings]
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
            interval={interval}
            setInterval={setInterval}
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

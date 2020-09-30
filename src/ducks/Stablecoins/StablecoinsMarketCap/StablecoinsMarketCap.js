import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import DashboardChartHeader, {
  DashboardIntervals
} from '../../../components/DashboardMetricChart/DashboardChartHeader/DashboardChartHeader'
import DashboardChartMetrics from '../../../components/DashboardMetricChart/DashboardChartMetrics/DashboardChartMetrics'
import {
  MARKET_CAP_YEAR_INTERVAL,
  STABLE_COINS_MARKETCAP_INTERVALS,
  StablecoinsMetrics,
  StablecoinColor
} from './utils'
import { useStablecoinsTimeseries } from './hooks'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import SharedAxisToggle from '../../Studio/Chart/SharedAxisToggle'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import DashboardMetricChartWrapper from '../../../components/DashboardMetricChart/DashboardMetricChartWrapper'
import DashboardMetricSelectors from '../../../components/DashboardMetricChart/DashboardMetricSelectors/DashboardMetricSelectors'
import styles from './StablecoinsMarketCap.module.scss'

const StablecoinsMarketCap = ({ className }) => {
  const [interval, setInterval] = useState(MARKET_CAP_YEAR_INTERVAL)
  const [disabledAssets, setDisabledAsset] = useState({})
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const [settings, setSettings] = useState(formIntervalSettings(interval.value))

  const {
    data,
    loadings,
    metrics,
    setRootMetric,
    rootMetric
  } = useStablecoinsTimeseries(settings)

  useEffect(
    () => {
      setSettings(formIntervalSettings(interval.value))
    },
    [interval]
  )

  const filteredMetrics = useMemo(
    () => metrics.filter(({ slug }) => !disabledAssets[slug]),
    [metrics, disabledAssets]
  )

  return (
    <div className={cx(styles.container, className)}>
      <DashboardChartHeader>
        <DashboardMetricSelectors
          metricSelectors={StablecoinsMetrics}
          rootMetric={rootMetric}
          setRootMetric={setRootMetric}
        />

        <SharedAxisToggle
          isDomainGroupingActive={isDomainGroupingActive}
          setIsDomainGroupingActive={setIsDomainGroupingActive}
          className={styles.sharedAxisToggle}
        />
        <DesktopOnly>
          <DashboardIntervals
            interval={interval}
            setInterval={setInterval}
            intervals={STABLE_COINS_MARKETCAP_INTERVALS}
          />
        </DesktopOnly>
      </DashboardChartHeader>

      <DesktopOnly>
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledMetrics={disabledAssets}
          colors={StablecoinColor}
        />
      </DesktopOnly>

      <DashboardMetricChartWrapper
        metrics={filteredMetrics}
        data={data}
        settings={settings}
        MetricColor={StablecoinColor}
        isDomainGroupingActive={isDomainGroupingActive}
        loadings={loadings}
      />

      <MobileOnly>
        <DashboardIntervals
          interval={interval}
          setInterval={setInterval}
          intervals={STABLE_COINS_MARKETCAP_INTERVALS}
        />
        <DashboardChartMetrics
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledMetrics={disabledAssets}
          colors={StablecoinColor}
        />
      </MobileOnly>
    </div>
  )
}

export default StablecoinsMarketCap

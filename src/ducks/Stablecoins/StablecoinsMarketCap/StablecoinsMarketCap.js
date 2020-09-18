import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import Button from '@santiment-network/ui/Button'
import StablecoinsHeader, {
  StablecoinsIntervals
} from './MarketCapHeader/StablecoinsHeader'
import CheckingAssets from './CheckingAssets/CheckingAssets'
import Chart from '../../Chart'
import { useMetricCategories } from '../../Chart/Synchronizer'
import {
  MARKET_CAP_YEAR_INTERVAL,
  STABLE_COINS_MARKETCAP_INTERVALS,
  StablecoinsMetrics,
  StablecoinColor
} from './utils'
import { useStablecoinsTimeseries } from './hooks'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import { mapSizesToProps } from '../../../utils/withSizes'
import SharedAxisToggle from '../../Studio/Chart/SharedAxisToggle'
import { useDomainGroups, useAxesMetricsKey } from '../../Chart/hooks'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'

import styles from './StablecoinsMarketCap.module.scss'

const CHART_HEIGHT = 400
const CHART_PADDING_DESKTOP = {
  top: 32,
  right: 74,
  bottom: 58,
  left: 24
}
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const StablecoinsMarketCap = ({ isDesktop, className }) => {
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

  const categories = useMetricCategories(filteredMetrics)

  const axesMetricKeys = useAxesMetricsKey(
    filteredMetrics,
    isDomainGroupingActive
  ).slice(0, 1)

  const domainGroups = useDomainGroups(filteredMetrics)

  return (
    <div className={cx(styles.container, className)}>
      <StablecoinsHeader>
        <div className={styles.metrics}>
          {StablecoinsMetrics.map(metric => {
            const { label, key } = metric
            const isActive = rootMetric.key === key
            return (
              <Button
                className={styles.metricBtn}
                key={key}
                variant={isActive ? 'flat' : 'ghost'}
                isActive={isActive}
                onClick={() => setRootMetric(metric)}
              >
                {label}
              </Button>
            )
          })}
        </div>

        <SharedAxisToggle
          isDomainGroupingActive={isDomainGroupingActive}
          setIsDomainGroupingActive={setIsDomainGroupingActive}
          className={styles.sharedAxisToggle}
        />
        <DesktopOnly>
          <StablecoinsIntervals
            interval={interval}
            setInterval={setInterval}
            intervals={STABLE_COINS_MARKETCAP_INTERVALS}
          />
        </DesktopOnly>
      </StablecoinsHeader>

      <DesktopOnly>
        <CheckingAssets
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledAssets={disabledAssets}
        />
      </DesktopOnly>

      <Chart
        {...settings}
        {...categories}
        data={data}
        chartHeight={CHART_HEIGHT}
        metrics={filteredMetrics}
        isCartesianGridActive={false}
        hideWatermark
        hideBrush
        chartPadding={isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE}
        resizeDependencies={[]}
        MetricColor={StablecoinColor}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        domainGroups={isDomainGroupingActive ? domainGroups : undefined}
        isLoading={loadings.length > 0}
      />

      <MobileOnly>
        <StablecoinsIntervals
          interval={interval}
          setInterval={setInterval}
          intervals={STABLE_COINS_MARKETCAP_INTERVALS}
        />
        <CheckingAssets
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledAssets={disabledAssets}
        />
      </MobileOnly>
    </div>
  )
}

export default withSizes(mapSizesToProps)(StablecoinsMarketCap)

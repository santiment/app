import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import StablecoinsHeader, {
  StablecoinsIntervals
} from './MarketCapHeader/StablecoinsHeader'
import CheckingAssets from './CheckingAssets/CheckingAssets'
import Chart from '../../Chart'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import {
  getIntervalDates,
  MARKET_CAP_DAY_INTERVAL,
  METRIC_SETTINGS_MAP,
  METRIC_TRANSFORMER,
  STABLE_COINS_MARKETCAP_INTERVALS,
  STABLE_COINS_METRICS
} from './utils'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { useChartMetrics, useMetricColors } from './hooks'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import { mapSizesToProps } from '../../../utils/withSizes'
import SharedAxisToggle from '../../Studio/Chart/SharedAxisToggle'
import { useDomainGroups } from '../../Chart/hooks'
import { extractMirrorMetricsDomainGroups } from '../../Chart/utils'
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
  const [interval, setInterval] = useState(MARKET_CAP_DAY_INTERVAL)
  const [disabledAssets, setDisabledAsset] = useState({})
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState()

  const [settings, setSettings] = useState({ ...getIntervalDates(interval) })

  useEffect(
    () => {
      setSettings({ ...getIntervalDates(interval) })
    },
    [interval]
  )

  const chartMetrics = useChartMetrics(STABLE_COINS_METRICS)

  const [data, loadings] = useTimeseries(
    STABLE_COINS_METRICS,
    settings,
    METRIC_SETTINGS_MAP,
    METRIC_TRANSFORMER
  )

  const MetricColor = useMetricColors(STABLE_COINS_METRICS)

  const filteredMetrics = useMemo(
    () => chartMetrics.filter(({ slug }) => !disabledAssets[slug]),
    [chartMetrics, disabledAssets]
  )

  const categories = metricsToPlotCategories(filteredMetrics, {})

  const xAxisKey = (filteredMetrics[0] || {}).key

  const domainGroups = useDomainGroups(filteredMetrics)
  const mirrorDomainGroups = useMemo(
    () => extractMirrorMetricsDomainGroups(domainGroups),
    [domainGroups]
  )

  return (
    <div className={cx(styles.container, className)}>
      <StablecoinsHeader title='Stablecoins Market Cap'>
        {domainGroups && domainGroups.length > mirrorDomainGroups.length && (
          <SharedAxisToggle
            isDomainGroupingActive={isDomainGroupingActive}
            setIsDomainGroupingActive={setIsDomainGroupingActive}
            className={styles.sharedAxisToggle}
          />
        )}
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
        MetricColor={MetricColor}
        tooltipKey={xAxisKey}
        axesMetricKeys={isDesktop ? [xAxisKey] : []}
        domainGroups={
          isDomainGroupingActive ? domainGroups : mirrorDomainGroups
        }
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

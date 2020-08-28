import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import Button from '@santiment-network/ui/Button'
import StablecoinsHeader, {
  StablecoinsIntervals
} from './MarketCapHeader/StablecoinsHeader'
import CheckingAssets from './CheckingAssets/CheckingAssets'
import Chart from '../../Chart'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import {
  formStablecoinsSettings,
  MARKET_CAP_YEAR_INTERVAL,
  STABLE_COINS_MARKETCAP_INTERVALS,
  StablecoinsMetrics
} from './utils'
import {
  useChartMetrics,
  useMetricColors,
  useStablecoinsTimeseries
} from './hooks'
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
  const [interval, setInterval] = useState(MARKET_CAP_YEAR_INTERVAL)
  const [disabledAssets, setDisabledAsset] = useState({})
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const [settings, setSettings] = useState(formStablecoinsSettings(interval))

  const {
    data,
    loadings,
    metrics,
    setMetric,
    currentMetric
  } = useStablecoinsTimeseries(settings)

  useEffect(
    () => {
      setSettings(formStablecoinsSettings(interval))
    },
    [interval]
  )

  const MetricColor = useMetricColors(metrics)
  const chartMetrics = useChartMetrics(metrics)

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
      <StablecoinsHeader>
        <div className={styles.metrics}>
          {StablecoinsMetrics.map(metric => {
            const { label, key } = metric
            const isActive = currentMetric.key === key
            return (
              <Button
                className={styles.metricBtn}
                key={key}
                variant={isActive ? 'flat' : 'ghost'}
                isActive={isActive}
                onClick={() => setMetric(metric)}
              >
                {label}
              </Button>
            )
          })}
        </div>

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

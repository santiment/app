import React, { useState } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { useTrackEvents } from '../../../hooks/tracking'
import { PROJECT_BY_SLUG_MOBILE_QUERY } from '../../../ducks/SANCharts/gql'
import Title from './MobileAssetTitle'
import AssetChart from './MobileAssetChart'
import PriceBlock from './MobileAssetPriceInfo'
import FullscreenChart from './MobileFullscreenChart'
import ChartSelector from './MobileAssetChartSelector'
import MobilePopularMetrics from './MobilePopularMetrics'
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks'
import ChartMetricsTool from '../../../ducks/SANCharts/ChartMetricsTool'
import { getNewInterval, INTERVAL_ALIAS } from '../../../ducks/SANCharts/IntervalSelector'
import { Metric } from '../../../ducks/dataHub/metrics'
import { PriceMetric, DEFAULT_SETTINGS, MAX_METRICS_PER_CHART } from './defaults'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import MobileProPopup from '../../../components/MobileProPopup/MobileProPopup'
import { useChartColors } from '../../../ducks/Chart/colors'
import RecentlyUsedMetrics from './RecentlyUsedMetrics'
import { getIntervalByTimeRange } from '../../../utils/dates'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import { addRecentAssets, addRecentMetric } from '../../../utils/recent'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = ({ data: { project = {}, loading }, ...props }) => {
  const { isPro: hasPremium } = useUserSubscriptionStatus()
  const [trackEvent] = useTrackEvents()
  const slug = props.match.params.slug

  addRecentAssets(slug)

  const [metrics, setMetrics] = useState([PriceMetric])
  const [PriceCurrency] = useState(Metric.price_usd)
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, slug })
  const [icoPricePos, setIcoPricePos] = useState(null)
  const [fullscreen, toggleFullscreen] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [width, setWidth] = useState()
  const [isOuterEvent, setIsOuterEvent] = useState(false)
  const MetricColor = useChartColors(metrics)
  const [data, loadings, ErrorMsg] = useTimeseries(metrics, settings)

  function toggleMetric(metric) {
    const newMetrics = new Set(metrics)

    if (!newMetrics.delete(metric)) {
      newMetrics.add(metric)
      Metric[metric.key] && addRecentMetric(metric.key)

      trackEvent({
        category: 'Chart',
        action: `Showing "${metric.label} on mobile"`,
      })
    } else {
      trackEvent({
        category: 'Chart',
        action: `Removing "${metric.label} on mobile"`,
      })
    }
    // NOTE: +1 because we don't count price metric
    if (newMetrics.size > MAX_METRICS_PER_CHART + 1) {
      setIsLimitReached(true)
      return
    } else if (isLimitReached) {
      setIsLimitReached(false)
    }

    setMetrics([...newMetrics])
  }

  function onChangeTimeRange(timeRange) {
    const { from: FROM, to: TO } = getIntervalByTimeRange(timeRange)
    const interval = getNewInterval(FROM, TO, '1d', { isMobile: true })
    setSettings({
      ...settings,
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: FROM.toISOString(),
      to: TO.toISOString(),
    })
  }

  const commonChartProps = {
    MetricColor,
    isLoading: loadings.length > 0,
    slug,
    data,
    metrics,
  }

  const commonMetricsToolProps = {
    slug,
    toggleMetric,
    showLimitMessage: isLimitReached,
    activeMetrics: metrics.slice(1),
    hiddenMetrics: [PriceCurrency],
    isMobile: true,
  }

  return loading ? (
    <div className={cx('page', styles.wrapper)}>
      <MobileHeader showBack title={<Title slug={slug} />} goBack={props.history.goBack} />
      <PageLoader />
    </div>
  ) : (
    <div className={cx('page', styles.wrapper)}>
      <MobileHeader
        showBack
        title={<Title slug={project.name} ticker={project.ticker} />}
        goBack={props.history.goBack}
      />
      <div
        className={styles.main}
        onTouchStart={() => setIsOuterEvent(true)}
        onTouchCancel={() => setIsOuterEvent(false)}
        onTouchEnd={() => setIsOuterEvent(false)}
        ref={(el) => {
          if (!el) return
          if (!width) {
            setWidth(el.getBoundingClientRect().width)
          }
        }}
      >
        <PriceBlock {...project} slug={slug} />
        {!fullscreen && (
          <AssetChart
            icoPrice={project.icoPrice}
            icoPricePos={icoPricePos}
            setIcoPricePos={setIcoPricePos}
            {...commonChartProps}
          />
        )}
        <div className={styles.bottom}>
          {!fullscreen && (
            <ChartSelector
              onChangeTimeRange={(value) => {
                onChangeTimeRange(value)
                setIcoPricePos(null)
              }}
              timeRange={settings.timeRange}
              className={styles.selector}
            />
          )}
          <FullscreenChart
            isOpen={fullscreen}
            toggleOpen={toggleFullscreen}
            project={project}
            onChangeTimeRange={onChangeTimeRange}
            timeRange={settings.timeRange}
            chartProps={commonChartProps}
            metricsToolProps={commonMetricsToolProps}
          />
        </div>
        {!hasPremium && metrics.length > 0 && <MobileProPopup />}
        <ChartMetricsTool
          classes={styles}
          addMetricBtnText='Add metrics'
          className={styles.metricsPopup}
          {...commonMetricsToolProps}
        />
        <div className={cx(styles.selected, metrics.length === 0 && styles.hide)}>
          {metrics.length > 1 && (
            <>
              <h3 className={styles.heading}>Selected Metrics</h3>
              {metrics.map((metric) =>
                metric.key === PriceCurrency.key ? null : (
                  <MobileMetricCard
                    metric={metric}
                    ticker={project.ticker}
                    isSelected
                    onToggleMetric={() => toggleMetric(metric)}
                    key={metric.label + 'selected'}
                    hasPremium={hasPremium}
                    errorsMetricsKeys={ErrorMsg}
                    colors={MetricColor}
                    width={width}
                    project={project}
                    slug={slug}
                    isOuterEvent={isOuterEvent}
                  />
                ),
              )}
            </>
          )}
        </div>
        {isLimitReached && (
          <div className={styles.limit}>To add a new metric, please de-select another one</div>
        )}
        <RecentlyUsedMetrics
          slug={slug}
          metrics={metrics}
          width={width}
          hasPremium={hasPremium}
          errorsMetricsKeys={ErrorMsg}
          isOuterEvent={isOuterEvent}
          project={project}
          onToggleMetric={toggleMetric}
        />
        <MobilePopularMetrics
          slug={slug}
          metrics={metrics}
          width={width}
          hasPremium={hasPremium}
          errorsMetricsKeys={ErrorMsg}
          isOuterEvent={isOuterEvent}
          project={project}
          onToggleMetric={toggleMetric}
        />
      </div>
    </div>
  )
}

export default graphql(PROJECT_BY_SLUG_MOBILE_QUERY, {
  skip: ({ match }) => !match.params.slug,
  options: ({ match }) => ({ variables: { slug: match.params.slug } }),
})(MobileDetailedPage)

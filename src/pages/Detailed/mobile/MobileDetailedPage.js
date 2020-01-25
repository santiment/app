import React, { useState } from 'react'
import cx from 'classnames'
import Loadable from 'react-loadable'
import GetAsset from '../gqlWrappers/GetAsset'
import Title from './MobileAssetTitle'
import AssetChart from './MobileAssetChart'
import PriceBlock from './MobileAssetPriceInfo'
import FullscreenChart from './MobileFullscreenChart'
import ChartSelector from './MobileAssetChartSelector'
import { Metrics } from '../../../ducks/SANCharts/data'
import ErrorRequest from '../../../ducks/SANCharts/ErrorRequest'
import GetTimeSeries from '../../../ducks/GetTimeSeries/GetTimeSeries'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../../ducks/SANCharts/IntervalSelector'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import { getSyncedColors } from '../../../ducks/SANCharts/TooltipSynchronizer'
import { addRecentAssets } from '../../../utils/recent'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './MobileDetailedPage.module.scss'

const LoadableChartMetricsTool = Loadable({
  loader: () => import('./../../../ducks/SANCharts/ChartMetricsTool'),
  loading: () => <div />
})

const DEFAULT_TIME_RANGE = '6m'

const MAX_METRICS_PER_CHART = 3

const POPULAR_METRICS = [
  Metrics.daily_active_addresses,
  Metrics.devActivity,
  Metrics.socialVolume
]

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE)
  const [icoPricePos, setIcoPricePos] = useState(null)
  const [extraMetrics, setExtraMetrics] = useState([])
  const [shownMetrics, setShownMetrics] = useState([])
  const [fullscreen, toggleFullscreen] = useState(false)

  addRecentAssets(slug)

  const toggleMetric = metric => {
    const newMetrics = new Set(extraMetrics)
    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      const metricsAmount = extraMetrics.length
      if (metricsAmount < MAX_METRICS_PER_CHART) {
        newMetrics.add(metric)
      }
    }
    setExtraMetrics([...newMetrics])
  }

  const { from, to } = getIntervalByTimeRange(timeRange)

  const interval = getNewInterval(from, to, '1d', { isMobile: true })

  const rest = {
    slug,
    from,
    to,
    interval: INTERVAL_ALIAS[interval] || interval
  }

  const requestedMetrics = [
    {
      name: 'historyPrice',
      key: Metrics['historyPrice'].key,
      ...Metrics['historyPrice'].reqMeta,
      ...rest
    }
  ]

  const requestedEvents = extraMetrics
    .filter(({ anomalyKey }) => anomalyKey)
    .map(({ key, anomalyKey }) => ({
      name: anomalyKey ? 'anomalies' : key,
      metric: anomalyKey,
      metricKey: key,
      ...rest
    }))

  extraMetrics.forEach(({ key, reqMeta }) => {
    const metric = {
      name: key,
      key,
      ...rest,
      ...reqMeta
    }

    requestedMetrics.push(metric)
  })

  return (
    <GetAsset
      slug={slug}
      render={({ isLoading, slug, project }) =>
        isLoading ? (
          <div className={cx('page', styles.wrapper)}>
            <MobileHeader
              showBack
              title={<Title slug={slug} />}
              goBack={props.history.goBack}
            />
            <PageLoader />
          </div>
        ) : (
          <div className={cx('page', styles.wrapper)}>
            <MobileHeader
              showBack
              title={<Title slug={project.name} ticker={project.ticker} />}
              goBack={props.history.goBack}
            />
            <div className={styles.main}>
              <GetTimeSeries
                metrics={requestedMetrics}
                events={requestedEvents}
                render={({
                  timeseries = [],
                  errorMetrics = {},
                  isError,
                  isLoading,
                  errorType
                }) => {
                  if (isError) {
                    return <ErrorRequest errorType={errorType} />
                  }

                  const errors = Object.keys(errorMetrics)
                  const finalMetrics = extraMetrics.filter(
                    ({ key }) => !errors.includes(key)
                  )

                  const notSelectedPopularNumber = POPULAR_METRICS.filter(
                    metric => !finalMetrics.includes(metric)
                  ).length

                  if (shownMetrics.length !== finalMetrics.length) {
                    setTimeout(() => setShownMetrics(finalMetrics), 500)
                  }

                  const metrics = [
                    Metrics['historyPricePreview'],
                    ...extraMetrics
                  ]
                  const syncedColors = getSyncedColors(metrics)

                  const commonChartProps = {
                    syncedColors,
                    metrics,
                    isLoading,
                    slug,
                    data: timeseries
                  }

                  return (
                    <>
                      <PriceBlock {...project} />
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
                            onChangeTimeRange={value => {
                              setTimeRange(value)
                              setIcoPricePos(null)
                            }}
                            timeRange={timeRange}
                          />
                        )}
                        <FullscreenChart
                          isOpen={fullscreen}
                          toggleOpen={toggleFullscreen}
                          project={project}
                          onChangeTimeRange={setTimeRange}
                          timeRange={timeRange}
                          chartProps={commonChartProps}
                        />
                      </div>
                      <div
                        className={cx(
                          styles.selected,
                          finalMetrics.length === 0 && styles.hide
                        )}
                      >
                        {shownMetrics.length > 0 && (
                          <>
                            <h3 className={styles.heading}>Selected Metrics</h3>
                            {shownMetrics.map(metric => (
                              <MobileMetricCard
                                metric={metric}
                                ticker={project.ticker}
                                isSelected
                                hide={!finalMetrics.includes(metric)}
                                onToggleMetric={() => toggleMetric(metric)}
                                key={metric.key + 'selected'}
                                {...rest}
                                colors={syncedColors}
                              />
                            ))}
                          </>
                        )}
                      </div>
                      <LoadableChartMetricsTool
                        classes={styles}
                        slug={slug}
                        toggleMetric={toggleMetric}
                        activeMetrics={finalMetrics}
                        disabledMetrics={errorMetrics}
                        hiddenMetrics={[Metrics.historyPrice]}
                        addMetricBtnText='Add metrics'
                        isMobile
                        className={styles.metricsPopup}
                      />
                      {notSelectedPopularNumber > 0 && (
                        <>
                          <h3 className={styles.heading}>Popular metrics</h3>
                          {POPULAR_METRICS.map(metric => (
                            <MobileMetricCard
                              metric={metric}
                              hide={finalMetrics.includes(metric)}
                              onToggleMetric={() => toggleMetric(metric)}
                              key={metric.key + 'popular'}
                              {...rest}
                            />
                          ))}
                        </>
                      )}
                    </>
                  )
                }}
              />
            </div>
          </div>
        )
      }
    />
  )
}

export default MobileDetailedPage

import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import GetAsset from '../gqlWrappers/GetAsset'
import Title from './MobileAssetTitle'
import AssetChart from './MobileAssetChart'
import PriceBlock from './MobileAssetPriceInfo'
import FullscreenChart from './MobileFullscreenChart'
import ChartSelector from './MobileAssetChartSelector'
import { checkHasPremium } from '../../UserSelectors'
import { Metrics } from '../../../ducks/SANCharts/data'
import { mapDatetimeToNumber } from '../../../ducks/SANCharts/utils'
import ErrorRequest from '../../../ducks/SANCharts/ErrorRequest'
import ChartMetricsTool from '../../../ducks/SANCharts/ChartMetricsTool'
import GetTimeSeries from '../../../ducks/GetTimeSeries/GetTimeSeries'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../../ducks/SANCharts/IntervalSelector'
import {
  makeRequestedData,
  DEFAULT_METRIC,
  DEFAULT_TIME_RANGE,
  MAX_METRICS_PER_CHART,
  POPULAR_METRICS
} from './utils'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import { getSyncedColors } from '../../../ducks/SANCharts/Chart/Synchronizer'
import { addRecentAssets } from '../../../utils/recent'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE)
  const [icoPricePos, setIcoPricePos] = useState(null)
  const [fullscreen, toggleFullscreen] = useState(false)
  const [metrics, setMetrics] = useState([])
  const [isLimitReached, setIsLimitReached] = useState(false)

  addRecentAssets(slug)

  const toggleMetric = metric => {
    const newMetrics = new Set(metrics)

    if (!newMetrics.delete(metric)) {
      newMetrics.add(metric)
    }

    if (newMetrics.size > MAX_METRICS_PER_CHART) {
      setIsLimitReached(true)
      return
    } else if (isLimitReached) {
      setIsLimitReached(false)
    }

    setMetrics([...newMetrics])
  }

  const { from, to } = getIntervalByTimeRange(timeRange)

  const interval = getNewInterval(from, to, '1d', { isMobile: true })

  const rest = {
    slug,
    from,
    to,
    interval: INTERVAL_ALIAS[interval] || interval
  }

  const requestedData = makeRequestedData({
    metrics: [DEFAULT_METRIC, ...metrics],
    ...rest
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
                {...requestedData}
                render={({
                  timeseries = [],
                  errorMetrics = {},
                  eventsData = [],
                  isError,
                  isLoading,
                  errorType
                }) => {
                  if (isError) {
                    return <ErrorRequest errorType={errorType} />
                  }

                  const errors = Object.keys(errorMetrics)
                  const finalMetrics = metrics.filter(
                    ({ key }) => !errors.includes(key)
                  )

                  const notSelectedPopularNumber = POPULAR_METRICS.filter(
                    metric => !finalMetrics.includes(metric)
                  ).length

                  const chartMetrics = [
                    Metrics['historyPricePreview'],
                    ...finalMetrics
                  ].filter(({ type }) => type !== 'events')
                  const syncedColors = getSyncedColors(chartMetrics)

                  const filteredEvents = eventsData.filter(
                    ({ metricAnomalyKey }) =>
                      !metricAnomalyKey ||
                      metrics.some(({ key }) => key === metricAnomalyKey)
                  )

                  const commonChartProps = {
                    syncedColors,
                    isLoading,
                    slug,
                    eventsData: filteredEvents,
                    data: mapDatetimeToNumber(timeseries),
                    metrics: chartMetrics
                  }

                  const commonMetricsToolProps = {
                    slug,
                    toggleMetric,
                    showLimitMessage: isLimitReached,
                    activeMetrics: metrics,
                    hiddenMetrics: [Metrics.historyPrice],
                    isMobile: true
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
                          metricsToolProps={commonMetricsToolProps}
                        />
                      </div>
                      <div
                        className={cx(
                          styles.selected,
                          finalMetrics.length === 0 && styles.hide
                        )}
                      >
                        {metrics.length > 0 && (
                          <>
                            <h3 className={styles.heading}>Selected Metrics</h3>
                            {metrics.map(metric => (
                              <MobileMetricCard
                                metric={metric}
                                ticker={project.ticker}
                                isSelected
                                onToggleMetric={() => toggleMetric(metric)}
                                key={metric.key + 'selected'}
                                {...rest}
                                errorMetrics={errors}
                                hasPremium={props.hasPremium}
                                colors={syncedColors}
                              />
                            ))}
                          </>
                        )}
                      </div>
                      <ChartMetricsTool
                        classes={styles}
                        addMetricBtnText='Add metrics'
                        className={styles.metricsPopup}
                        {...commonMetricsToolProps}
                      />
                      {isLimitReached && (
                        <div className={styles.limit}>
                          To add a new metric, please de-select another one
                        </div>
                      )}
                      {notSelectedPopularNumber > 0 && (
                        <>
                          <h3 className={styles.heading}>Popular metrics</h3>
                          {POPULAR_METRICS.map(metric => (
                            <MobileMetricCard
                              metric={metric}
                              onToggleMetric={() => toggleMetric(metric)}
                              key={metric.key + 'popular'}
                              hasPremium={props.hasPremium}
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

const mapStateToProps = state => ({ hasPremium: checkHasPremium(state) })

export default connect(mapStateToProps)(MobileDetailedPage)

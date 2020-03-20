import React, { useState } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import GA from '../../../utils/tracking'
import { PROJECT_BY_SLUG_MOBILE_QUERY } from '../../../ducks/SANCharts/gql'
import Title from './MobileAssetTitle'
import AssetChart from './MobileAssetChart'
import PriceBlock from './MobileAssetPriceInfo'
import FullscreenChart from './MobileFullscreenChart'
import ChartSelector from './MobileAssetChartSelector'
import MobilePopularMetrics from './MobilePopularMetrics'
import { checkHasPremium } from '../../UserSelectors'
import { Metrics } from '../../../ducks/SANCharts/metrics/data'
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
  convertEventsToObj,
  DEFAULT_METRIC,
  DEFAULT_TIME_RANGE,
  MAX_METRICS_PER_CHART
} from './utils'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import MobileProPopup from '../../../components/MobileProPopup/MobileProPopup'
import {
  getSyncedColors,
  prepareEvents
} from '../../../ducks/SANCharts/Chart/Synchronizer'
import { addRecentAssets } from '../../../utils/recent'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = ({
  hasPremium,
  data: { project = {}, loading },
  ...props
}) => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE)
  const [icoPricePos, setIcoPricePos] = useState(null)
  const [fullscreen, toggleFullscreen] = useState(false)
  const [metrics, setMetrics] = useState([])
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [width, setWidth] = useState()
  const [isOuterEvent, setIsOuterEvent] = useState(false)

  addRecentAssets(slug)

  const toggleMetric = metric => {
    const newMetrics = new Set(metrics)

    if (!newMetrics.delete(metric)) {
      newMetrics.add(metric)

      GA.event({
        category: 'Chart',
        action: `Showing "${metric.label} on mobile"`
      })
    } else {
      GA.event({
        category: 'Chart',
        action: `Removing "${metric.label} on movile"`
      })
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

  return loading ? (
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
      <div
        className={styles.main}
        onTouchStart={() => setIsOuterEvent(true)}
        onTouchCancel={() => setIsOuterEvent(false)}
        onTouchEnd={() => setIsOuterEvent(false)}
        ref={el => {
          if (!el) return
          if (!width) {
            setWidth(el.getBoundingClientRect().width)
          }
        }}
      >
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

            const chartMetrics = [
              Metrics.historyPricePreview,
              ...finalMetrics
            ].filter(({ type }) => type !== 'events')
            const syncedColors = getSyncedColors(chartMetrics)

            const filteredEvents = eventsData.filter(
              ({ metricAnomalyKey }) =>
                !metricAnomalyKey ||
                metrics.some(({ key }) => key === metricAnomalyKey)
            )

            const data = mapDatetimeToNumber(timeseries)

            const events = prepareEvents(filteredEvents).map(
              ({ metric, datetime, key, ...rest }) => {
                const day = data.find(item => item.datetime === datetime)
                return {
                  metric,
                  y: day ? day[metric] : 0,
                  datetime,
                  key,
                  ...rest,
                  color: key === 'trendingPosition' ? '#505573' : rest.color
                }
              }
            )

            const eventsObj = convertEventsToObj(events)

            const commonChartProps = {
              syncedColors,
              isLoading,
              slug,
              events,
              eventsObj,
              data,
              metrics: chartMetrics
            }

            const commonMetricsToolProps = {
              slug,
              toggleMetric,
              showLimitMessage: isLimitReached,
              activeMetrics: metrics,
              hiddenMetrics: [Metrics.price_usd],
              isMobile: true
            }

            return (
              <>
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
                      onChangeTimeRange={value => {
                        setTimeRange(value)
                        setIcoPricePos(null)
                      }}
                      timeRange={timeRange}
                      className={styles.selector}
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
                {!hasPremium && metrics.length > 0 && <MobileProPopup />}
                <ChartMetricsTool
                  classes={styles}
                  addMetricBtnText='Add metrics'
                  className={styles.metricsPopup}
                  {...commonMetricsToolProps}
                />
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
                          hasPremium={hasPremium}
                          errorsMetricsKeys={errors}
                          colors={syncedColors}
                          width={width}
                          project={project}
                          isOuterEvent={isOuterEvent}
                        />
                      ))}
                    </>
                  )}
                </div>
                {isLimitReached && (
                  <div className={styles.limit}>
                    To add a new metric, please de-select another one
                  </div>
                )}
                <MobilePopularMetrics
                  metrics={metrics}
                  width={width}
                  hasPremium={hasPremium}
                  errorsMetricsKeys={errors}
                  isOuterEvent={isOuterEvent}
                  project={project}
                  onToggleMetric={toggleMetric}
                  {...rest}
                />
              </>
            )
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ hasPremium: checkHasPremium(state) })

export default compose(
  connect(mapStateToProps),
  graphql(PROJECT_BY_SLUG_MOBILE_QUERY, {
    skip: ({ match }) => !match.params.slug,
    options: ({ match }) => ({ variables: { slug: match.params.slug } })
  })
)(MobileDetailedPage)

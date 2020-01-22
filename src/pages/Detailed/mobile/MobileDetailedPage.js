import React, { useState } from 'react'
import cx from 'classnames'
import { getIntervalByTimeRange } from '../../../utils/dates'
import Loadable from 'react-loadable'
import { getInterval } from './utils'
import { Metrics } from '../../../ducks/SANCharts/data'
import ErrorRequest from '../../../ducks/SANCharts/ErrorRequest'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import GetAsset from '../gqlWrappers/GetAsset'
import GetTimeSeries from '../../../ducks/GetTimeSeries/GetTimeSeries'
import MobileAssetChart from './MobileAssetChart'
import Title from './MobileAssetTitle'
import PriceBlock from './MobileAssetPriceInfo'
import MobileAssetChartSelector from './MobileAssetChartSelector'
import MobileFullscreenChart from './MobileFullscreenChart'
import { addRecentAssets } from '../../../utils/recent'
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
  const [extraMetricsNames, setExtraMetricsNames] = useState(new Set())
  const [fullscreen, toggleFullscreen] = useState(false)

  addRecentAssets(slug)

  const { from, to } = getIntervalByTimeRange(timeRange, {
    isMobile: true
  })

  const toggleMetric = metric => {
    const newMetrics = new Set(extraMetricsNames)
    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      const metricsAmount = extraMetricsNames.size
      if (metricsAmount < MAX_METRICS_PER_CHART) {
        newMetrics.add(metric)
      }
    }
    setExtraMetricsNames(newMetrics)
  }

  const rest = { slug, from, to }

  const price = {
    name: 'historyPrice',
    ...Metrics['historyPrice'],
    ...rest,
    interval: getInterval(timeRange)
  }

  const extraMetrics = []

  if (extraMetricsNames.size > 0) {
    extraMetricsNames.forEach(({ key, reqMeta }) => {
      const metric = {
        name: key,
        key,
        interval: getInterval(timeRange),
        ...rest,
        ...reqMeta
      }

      extraMetrics.push(metric)
    })
  }

  return (
    <div className={cx('page', styles.wrapper)}>
      <GetAsset
        slug={slug}
        render={({ isLoading, slug, project }) => {
          if (isLoading) {
            return (
              <>
                <MobileHeader
                  showBack
                  title={<Title slug={slug} />}
                  goBack={props.history.goBack}
                />
                <PageLoader />
              </>
            )
          }

          return (
            <>
              <MobileHeader
                showBack
                title={<Title slug={project.name} ticker={project.ticker} />}
                goBack={props.history.goBack}
              />
              <div className={styles.main}>
                <GetTimeSeries
                  metrics={[price, ...extraMetrics]}
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
                    const finalMetrics = [...extraMetricsNames].filter(
                      ({ key }) => !errors.includes(key)
                    )

                    const metricsTool = (
                      <LoadableChartMetricsTool
                        classes={styles}
                        slug={slug}
                        toggleMetric={toggleMetric}
                        activeMetrics={finalMetrics}
                        disabledMetrics={errorMetrics}
                        hiddenMetrics={[Metrics.historyPrice]}
                        isMobile
                        className={styles.metricsPopup}
                      />
                    )

                    return (
                      <>
                        <PriceBlock {...project} />
                        {!fullscreen && (
                          <MobileAssetChart
                            data={timeseries}
                            slug={slug}
                            icoPrice={project.icoPrice}
                            icoPricePos={icoPricePos}
                            setIcoPricePos={setIcoPricePos}
                            extraMetrics={extraMetrics}
                            isLoading={isLoading}
                          />
                        )}
                        <div className={styles.bottom}>
                          {!fullscreen && (
                            <MobileAssetChartSelector
                              onChangeTimeRange={value => {
                                setTimeRange(value)
                                setIcoPricePos(null)
                              }}
                              timeRange={timeRange}
                            />
                          )}
                          <MobileFullscreenChart
                            isOpen={fullscreen}
                            toggleOpen={toggleFullscreen}
                            project={project}
                            onChangeTimeRange={setTimeRange}
                            timeRange={timeRange}
                            isLoading={isLoading}
                            data={timeseries}
                            slug={slug}
                            extraMetrics={extraMetrics}
                          />
                        </div>
                        {extraMetricsNames.size > 0 && (
                          <>
                            <h3 className={styles.heading}>Choosed Metrics</h3>
                            {[...extraMetricsNames].map((metric, idx) => (
                              <MobileMetricCard
                                metric={metric}
                                onToggleMetric={() => toggleMetric(metric)}
                                key={idx}
                                {...rest}
                              />
                            ))}
                            {metricsTool}
                          </>
                        )}
                        <h3 className={styles.heading}>Popular metrics</h3>
                        {POPULAR_METRICS.map((metric, idx) => (
                          <MobileMetricCard
                            metric={metric}
                            onToggleMetric={() => toggleMetric(metric)}
                            key={idx}
                            {...rest}
                          />
                        ))}
                        {metricsTool}
                      </>
                    )
                  }}
                />
              </div>
            </>
          )
        }}
      />
    </div>
  )
}

export default MobileDetailedPage

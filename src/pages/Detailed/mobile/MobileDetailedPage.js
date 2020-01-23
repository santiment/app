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
import MetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
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
      ...Metrics['historyPrice'],
      ...rest
    }
  ]

  if (extraMetrics.length > 0) {
    extraMetrics.forEach(({ key, reqMeta }) => {
      const metric = {
        name: key,
        key,
        ...rest,
        ...reqMeta
      }

      requestedMetrics.push(metric)
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
                  metrics={requestedMetrics}
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
                          <AssetChart
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
                            isLoading={isLoading}
                            data={timeseries}
                            slug={slug}
                            extraMetrics={extraMetrics}
                          />
                        </div>
                        {extraMetrics.length > 0 && (
                          <>
                            <h3 className={styles.heading}>Choosed Metrics</h3>
                            {extraMetrics.map((metric, idx) => (
                              <MetricCard
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
                          <MetricCard
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

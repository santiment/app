import React, { useState } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { NEWS_QUERY } from '../../../components/News/NewsGQL'
import { calcPercentageChange } from '../../../utils/utils'
import {
  DAY,
  getTimeIntervalFromToday,
  getIntervalByTimeRange
} from '../../../utils/dates'
import Loadable from 'react-loadable'
import { getInterval } from './utils'
import { Metrics, compatabilityMap } from '../../../ducks/SANCharts/data'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import NewsSmall from '../../../components/News/NewsSmall'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import GetAsset from '../gqlWrappers/GetAsset'
import GetTimeSeries from '../../../ducks/GetTimeSeries/GetTimeSeries'
import MobileAssetChart from './MobileAssetChart'
import Title from './MobileAssetTitle'
import PriceBlock from './MobileAssetPriceInfo'
import MobileAssetChartSelector from './MobileAssetChartSelector'
import MobileFullscreenChart from './MobileFullscreenChart'
import ShowIf from '../../../components/ShowIf'
import GetWatchlists from '../../../ducks/Watchlists/GetWatchlists'
import WatchlistsPopup from '../../../components/WatchlistPopup/WatchlistsPopup'
import { addRecentAssets } from '../../../utils/recent'
import styles from './MobileDetailedPage.module.scss'

const LoadableChartMetricsTool = Loadable({
  loader: () => import('./../../../ducks/SANCharts/ChartMetricsTool'),
  loading: () => <div />
})

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState('6m')
  const [icoPricePos, setIcoPricePos] = useState(null)
  const [extraMetricsNames, setExtraMetricsNames] = useState(new Set())
  const [fullscreen, toggleFullscreen] = useState(false)

  addRecentAssets(slug)

  const toggleMetric = metric => {
    console.log(metric)
    const newMetrics = new Set(extraMetricsNames)
    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      const metricsAmount = extraMetricsNames.size
      if (metricsAmount < 3) {
        newMetrics.add(metric)
      }

      setExtraMetricsNames(newMetrics)
    }
  }

  const { from, to } = getIntervalByTimeRange(timeRange, { isMobile: true })

  const price = {
    name: 'historyPrice',
    ...Metrics['historyPrice'],
    slug,
    from: from.toISOString(),
    to: to.toISOString(),
    interval: getInterval(timeRange)
  }
  // {
  //   name: 'transaction_volume',
  //   ...Metrics['transaction_volume'],
  //   slug,
  //   from: from.toISOString(),
  //   to: to.toISOString(),
  //   interval: getInterval(timeRange)
  // },
  // {
  //   name: 'devActivity',
  //   ...Metrics['devActivity'],
  //   ...Metrics['devActivity'].reqMeta,
  //   slug,
  //   from: from.toISOString(),
  //   to: to.toISOString(),
  //   interval: getInterval(timeRange)
  // }

  const lastTwoDaysMetrics = [
    {
      name: 'transaction_volume',
      slug,
      timeRange: '2d',
      interval: '1d'
    }
  ]

  const extraMetrics = []

  if (extraMetricsNames.size > 0) {
    extraMetricsNames.forEach(({ key, reqMeta }) => {
      const metric = {
        name: key,
        key,
        interval: getInterval(timeRange),
        slug,
        from: from.toISOString(),
        to: to.toISOString(),
        ...reqMeta
      }

      extraMetrics.push(metric)
    })
  }

  const metricsTool = (
    <LoadableChartMetricsTool
      classes={styles}
      slug={slug}
      toggleMetric={toggleMetric}
      activeMetrics={[...extraMetricsNames]}
      hiddenMetrics={[Metrics.historyPrice]}
      isMobile
    />
  )

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
                  render={({ historyPrice = {}, timeseries }) =>
                    historyPrice.isLoading ? (
                      'Loading...'
                    ) : (
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
                            data={timeseries}
                            slug={slug}
                            extraMetrics={extraMetrics}
                          />
                        </div>
                      </>
                    )
                  }
                />

                {metricsTool}

                <ShowIf news>
                  {props.news && props.news.length > 0 && (
                    <>
                      <h3 className={styles.news__heading}>News</h3>
                      <NewsSmall data={props.news} />
                    </>
                  )}
                </ShowIf>
              </div>
              <GetWatchlists
                render={({ isLoggedIn }) => (
                  <WatchlistsPopup
                    projectId={project.id}
                    slug={project.slug}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
            </>
          )
        }}
      />
    </div>
  )
}

const enhance = compose(
  graphql(NEWS_QUERY, {
    options: ({ match }) => {
      const tag = match.params.slug
      const { from, to } = getTimeIntervalFromToday(-3, DAY)
      return {
        variables: { from, to, tag, size: 6 }
      }
    },
    props: ({ data: { news = [] } }) => ({ news: news.reverse() })
  })
)

export default enhance(MobileDetailedPage)

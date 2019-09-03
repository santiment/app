import React, { useState } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Label, Selector } from '@santiment-network/ui'
import { DailyActiveAddressesGQL } from '../gqlWrappers/DetailedGQL'
import { TRANSACTION_VOLUME_QUERY } from '../../../ducks/GetTimeSeries/queries/transaction_volume_query'
import { SOCIAL_VOLUME_QUERY } from '../../../ducks/GetTimeSeries/queries/social_volume_query'
import { NEWS_QUERY } from '../../../components/News/NewsGQL'
import { calcPercentageChange, capitalizeStr } from '../../../utils/utils'
import {
  DAY,
  getTimeIntervalFromToday,
  getIntervalByTimeRange
} from '../../../utils/dates'
import { formatNumber } from '../../../utils/formatting'
import { Metrics } from '../../../ducks/SANCharts/utils'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import PercentChanges from '../../../components/PercentChanges'
import NewsSmall from '../../../components/News/NewsSmall'
import PageLoader from '../../../components/Loader/PageLoader'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import GetAsset from '../gqlWrappers/GetAsset'
import GetTimeSeries from '../../../ducks/GetTimeSeries/GetTimeSeries'
import MobileAssetChart from './MobileAssetChart'
import ShowIf from '../../../components/ShowIf'
import GetWatchlists from '../../../ducks/Watchlists/GetWatchlists'
import WatchlistsPopup from '../../../components/WatchlistPopup/WatchlistsPopup'
import { addRecentAssets } from '../../../utils/recent'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState('6m')
  const [extraMetric, setExtraMetric] = useState()

  addRecentAssets(slug)

  const toggleExtraMetric = toggledMetric => {
    if (extraMetric && toggledMetric.name === extraMetric.name) {
      setExtraMetric(undefined)
    } else {
      setExtraMetric(toggledMetric)
    }
  }

  const timeRangeBlock = (
    <div className={styles.timeRangeBlock}>
      <Selector
        options={['1w', '1m', '3m', '6m', 'all']}
        onSelectOption={setTimeRange}
        defaultSelected={timeRange}
      />
    </div>
  )

  let transactionVolumeInfo
  const { transactionVolume } = props
  if (transactionVolume && transactionVolume.length === 48) {
    const yesterdayTransactionVolume = transactionVolume
      .slice(0, 24)
      .reduce((acc, { transactionVolume }) => acc + transactionVolume, 0)
    const todayTransactionVolume = transactionVolume
      .slice(-24)
      .reduce((acc, { transactionVolume }) => acc + transactionVolume, 0)
    const TVDiff = calcPercentageChange(
      yesterdayTransactionVolume,
      todayTransactionVolume
    )
    transactionVolumeInfo = {
      metric: 'transactionVolume',
      name: 'Transaction Volume',
      value: todayTransactionVolume,
      period: '24h',
      changes: TVDiff
    }
  }

  let socialVolumeInfo
  const { socialVolume } = props
  if (socialVolume[0] && socialVolume[1]) {
    const yesterdaySocialVolume = socialVolume[0]
    const todaySocialVolume = socialVolume[1]
    const SVDiff = calcPercentageChange(
      yesterdaySocialVolume,
      todaySocialVolume
    )
    socialVolumeInfo = {
      name: 'Social Volume',
      metric: 'socialVolume',
      value: todaySocialVolume,
      period: '24h',
      changes: SVDiff
    }
  }

  let activeAddressesInfo
  const { dailyActiveAddresses } = props
  if (dailyActiveAddresses && dailyActiveAddresses.length === 2) {
    const [
      { activeAddresses: yesterdayActiveAddresses },
      { activeAddresses: todayActiveAddresses }
    ] = dailyActiveAddresses
    const DAADiff = calcPercentageChange(
      yesterdayActiveAddresses,
      todayActiveAddresses
    )
    activeAddressesInfo = {
      metric: 'dailyActiveAddresses',
      name: 'Daily Active Addresses',
      value: todayActiveAddresses,
      period: '24h',
      changes: DAADiff
    }
  }

  const { from, to } = getIntervalByTimeRange(timeRange)

  const metrics = [
    {
      name: 'historyPrice',
      slug,
      timeRange,
      interval: timeRange === '1w' ? '2h' : timeRange === '1m' ? '8h' : '1d'
    }
  ]

  if (extraMetric) {
    const { alias } = Metrics[extraMetric.name]
    const metric = { name: alias || extraMetric.name }
    if (extraMetric.name === 'devActivity') {
      metric.transform = 'movingAverage'
      metric.movingAverageIntervalBase = 7
    }
    metrics.push(Object.assign({}, metrics[0], metric))
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

          const {
            ticker,
            percentChange24h,
            percentChange7d,
            devActivity30,
            devActivity60,
            priceUsd,
            icoPrice
          } = project

          let devActivityInfo
          if (devActivity30 && devActivity60) {
            const DADiff = calcPercentageChange(
              devActivity60 * 2 - devActivity30,
              devActivity30
            )
            devActivityInfo = {
              metric: 'devActivity',
              name: 'Development Activity',
              value: devActivity30,
              period: '30d',
              changes: DADiff
            }
          }
          return (
            <>
              <MobileHeader
                showBack
                title={<Title slug={slug} ticker={ticker} />}
                goBack={props.history.goBack}
              />
              <GetWatchlists
                render={({ isLoggedIn }) => (
                  <WatchlistsPopup
                    projectId={project.id}
                    slug={project.slug}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              <div className={styles.main}>
                <PriceBlock
                  changes24h={percentChange24h}
                  changes7d={percentChange7d}
                  priceUsd={priceUsd}
                />
                <GetTimeSeries
                  metrics={metrics}
                  render={({ historyPrice = {}, timeseries }) => {
                    if (historyPrice.isLoading) {
                      return 'Loading...'
                    }

                    return (
                      <>
                        <MobileAssetChart
                          data={timeseries}
                          slug={slug}
                          icoPrice={icoPrice}
                          extraMetric={extraMetric}
                        />
                        {timeRangeBlock}
                        <div className={styles.metrics}>
                          {activeAddressesInfo && (
                            <MobileMetricCard
                              {...activeAddressesInfo}
                              slug={slug}
                              activeMetric={extraMetric}
                              onClick={toggleExtraMetric}
                              from={from}
                              to={to}
                            />
                          )}
                          {devActivityInfo && (
                            <MobileMetricCard
                              {...devActivityInfo}
                              slug={slug}
                              activeMetric={extraMetric}
                              onClick={toggleExtraMetric}
                              from={from}
                              to={to}
                            />
                          )}
                          {transactionVolumeInfo && (
                            <MobileMetricCard
                              {...transactionVolumeInfo}
                              measure={ticker}
                              onClick={toggleExtraMetric}
                            />
                          )}
                          {socialVolumeInfo && (
                            <MobileMetricCard
                              {...socialVolumeInfo}
                              slug={slug}
                              from={from}
                              to={to}
                              activeMetric={extraMetric}
                              onClick={toggleExtraMetric}
                            />
                          )}
                        </div>
                        <ShowIf news>
                          {props.news && props.news.length > 0 && (
                            <>
                              <h3 className={styles.news__heading}>News</h3>
                              <NewsSmall data={props.news} />
                            </>
                          )}
                        </ShowIf>
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

const Title = ({ slug, ticker }) => (
  <>
    {capitalizeStr(slug)}{' '}
    {ticker && <span className={styles.ticker}>({ticker.toUpperCase()})</span>}
  </>
)

const PriceBlock = ({ changes24h, changes7d, priceUsd }) => (
  <div className={styles.PriceBlock}>
    <div className={styles.priceUsd}>
      {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
    </div>
    <PercentChanges className={styles.changes} changes={changes24h} />
    <Label className={styles.label} accent='waterloo'>
      24h
    </Label>
    <PercentChanges className={styles.changes} changes={changes7d} />
    <Label className={styles.label} accent='waterloo'>
      7d
    </Label>
  </div>
)

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
  }),
  graphql(TRANSACTION_VOLUME_QUERY, {
    options: ({ match }) => {
      const to = new Date()
      const from = new Date()
      to.setUTCHours(to.getUTCHours() - 1, 0, 0, 0)
      from.setUTCHours(from.getUTCHours() - 48, 0, 0, 0)
      const { slug } = match.params
      return {
        variables: {
          slug,
          from: from.toISOString(),
          to: to.toISOString(),
          interval: '1h'
        }
      }
    },
    props: ({ data: { transactionVolume = [] } }) => ({ transactionVolume })
  }),
  graphql(SOCIAL_VOLUME_QUERY, {
    options: ({ match }) => {
      const { from, to } = getTimeIntervalFromToday(-2, DAY)
      const { slug } = match.params
      return {
        variables: {
          slug,
          from,
          to,
          interval: '1d'
        }
      }
    },
    props: ({
      data: {
        discordDiscussionSocialVolume: discord = [],
        proffesionalSocialVolume: prof = [],
        telegramChatsSocialVolume: telChats = [],
        telegramDiscussionSocialVolume: telDisscuss = []
      }
    }) => {
      const defaultVolume = { socialVolume: 0 }
      const socialVolume = [0, 0].map(
        (item, i) =>
          item +
          (discord[i] || defaultVolume).socialVolume +
          (prof[i] || defaultVolume).socialVolume +
          (telChats[i] || defaultVolume).socialVolume +
          (telDisscuss[i] || defaultVolume).socialVolume
      )
      return { socialVolume }
    }
  }),
  graphql(DailyActiveAddressesGQL, {
    options: ({ match }) => {
      const { slug } = match.params
      const { from, to } = getTimeIntervalFromToday(-1, DAY)
      return { variables: { from, to, slug } }
    },
    props: ({ data: { dailyActiveAddresses = [] } }) => ({
      dailyActiveAddresses
    })
  })
)

export default enhance(MobileDetailedPage)

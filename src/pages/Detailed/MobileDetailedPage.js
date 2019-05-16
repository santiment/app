import React, { useState } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Label, Selector } from '@santiment-network/ui'
import { DailyActiveAddressesGQL } from './DetailedGQL'
import { TRANSACTION_VOLUME_QUERY } from '../../ducks/GetTimeSeries/queries/transaction_volume_query'
import { capitalizeStr } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'
import { calcPercentageChange } from '../../utils/utils'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import PercentChanges from './../../components/PercentChanges'
import PageLoader from '../../components/Loader/PageLoader'
import MobileMetricCard from '../../components/MobileMetricCard/MobileMetricCard'
import GetAsset from './GetAsset'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import MobileAssetChart from './MobileAssetChart'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  const [timeRange, setTimeRange] = useState('all')

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
  if (transactionVolume && transactionVolume.length === 2) {
    const [
      {
        transactionVolume: yesterdayTransactionVolume,
        transactionVolume: todayTransactionVolume
      }
    ] = transactionVolume
    const TVDiff = calcPercentageChange(
      yesterdayTransactionVolume,
      todayTransactionVolume
    )
    if (todayTransactionVolume > 0) {
      transactionVolumeInfo = {
        name: 'Transaction Volume',
        value: todayTransactionVolume,
        label: '24h',
        changes: TVDiff
      }
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
    if (todayActiveAddresses > 0) {
      activeAddressesInfo = {
        name: 'Daily Active Addresses',
        value: todayActiveAddresses,
        label: '24h',
        changes: DAADiff
      }
    }
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
            if (devActivity30 > 0) {
              devActivityInfo = {
                name: 'Development Activity',
                value: devActivity30,
                label: '30d',
                changes: DADiff
              }
            }
          }

          return (
            <>
              <MobileHeader
                showBack
                title={<Title slug={slug} ticker={ticker} />}
                goBack={props.history.goBack}
              />
              <div className={styles.main}>
                <PriceBlock
                  changes24h={percentChange24h}
                  changes7d={percentChange7d}
                  priceUsd={priceUsd}
                />
                {timeRangeBlock}
                <GetTimeSeries
                  price={{
                    slug,
                    timeRange,
                    interval:
                      timeRange === '1w' || timeRange === '1m' ? '1h' : '1d'
                  }}
                  render={({ price = {} }) => {
                    if (price.isLoading) {
                      return 'Loading...'
                    }
                    return (
                      <>
                        <MobileAssetChart
                          data={price.items}
                          slug={slug}
                          icoPrice={icoPrice}
                        />
                        {activeAddressesInfo && (
                          <MobileMetricCard {...activeAddressesInfo} />
                        )}
                        {devActivityInfo && (
                          <MobileMetricCard {...devActivityInfo} />
                        )}
                        {transactionVolumeInfo && (
                          <MobileMetricCard {...transactionVolumeInfo} />
                        )}
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
  <div>
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
  graphql(TRANSACTION_VOLUME_QUERY, {
    options: ({ match }) => {
      // const {from, to} = getTimeIntervalFromToday(-1, DAY) // change next two lines to it before prod
      const { from } = getTimeIntervalFromToday(-61, DAY)
      const { from: to } = getTimeIntervalFromToday(-60, DAY)
      const { slug } = match.params
      return { variables: { slug, from, to, interval: '1d' } }
    },
    props: ({ data: { transactionVolume = [] } }) => ({ transactionVolume })
  }),
  graphql(DailyActiveAddressesGQL, {
    options: ({ match }) => {
      const { slug } = match.params
      // const {from, to} = getTimeIntervalFromToday(-2, DAY) // change next two lines to it before prod
      const { from } = getTimeIntervalFromToday(-661, DAY)
      const { from: to } = getTimeIntervalFromToday(-659, DAY)
      return { variables: { from, to, slug } }
    },
    props: ({ data: { dailyActiveAddresses = [] } }) => ({
      dailyActiveAddresses
    })
  })
)

export default enhance(MobileDetailedPage)

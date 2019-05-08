import React, { useState } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Label, Selector } from '@santiment-network/ui'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import PercentChanges from './../../components/PercentChanges'
import PageLoader from '../../components/PageLoader'
import { capitalizeStr } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'
import GetAsset from './GetAsset'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import MobileAssetChart from './MobileAssetChart'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { TRANSACTION_VOLUME_QUERY } from '../../ducks/GetTimeSeries/queries/transaction_volume_query'
import MobileMetricCard from './MobileMetricCard'
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

  function calculateDiff (prev, curr) {
    return (prev / curr - 1) * 100
  }

  let transactionVolumeToday
  let transactionVolumeYesterday
  let transactionVolumeDiff

  const { transactionVolume } = props
  if (transactionVolume && transactionVolume.length === 2) {
    transactionVolumeToday = transactionVolume[0].transactionVolume
    transactionVolumeYesterday = transactionVolume[1].transactionVolume
    transactionVolumeDiff = calculateDiff(
      transactionVolumeYesterday,
      transactionVolumeToday
    )
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

          let devActivityDiff
          if (devActivity30 && devActivity60) {
            devActivityDiff = calculateDiff(
              devActivity60 * 2 - devActivity30,
              devActivity30
            )
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
                        <MobileMetricCard
                          name='Daily Active Adresses'
                          label='24h'
                        />
                        {devActivityDiff && (
                          <MobileMetricCard
                            name='Development Activity'
                            label='30d'
                            value={devActivity30}
                            changes={devActivityDiff}
                          />
                        )}
                        {transactionVolumeDiff && (
                          <MobileMetricCard
                            name='Transaction volume'
                            label='24h'
                            value={transactionVolumeToday}
                            changes={transactionVolumeDiff}
                          />
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
      // const {from, to} = getTimeIntervalFromToday(-1, DAY)
      const { from } = getTimeIntervalFromToday(-61, DAY)
      const { from: to } = getTimeIntervalFromToday(-60, DAY)
      const slug = match.params.slug
      return {
        variables: { slug, from, to, interval: '1d' }
      }
    },
    props: ({ data: { transactionVolume = [] } }) => ({ transactionVolume })
  })
  // graphql(DailyActiveAddressesGQL, {
  //   name: 'DailyActiveAddresses',
  //   options: ({match}) => {
  //     const slug = match.params.slug
  //     const {from, to} = getTimeIntervalFromToday(-30, DAY)
  //     return {
  //       variables: {
  //         from,
  //         to,
  //         slug,
  //         interval: ''
  //       }
  //     }
  //   }
  // }),
)

export default enhance(MobileDetailedPage)

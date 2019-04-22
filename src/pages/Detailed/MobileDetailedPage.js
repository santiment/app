import React, { useState } from 'react'
import cx from 'classnames'
import { Selector } from '@santiment-network/ui'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import PercentChanges from './../../components/PercentChanges'
import { capitalizeStr } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'
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

  return (
    <div className={cx('page', styles.wrapper)}>
      <GetAsset
        slug={slug}
        render={({ isLoading, slug, project }) => {
          if (isLoading) {
            return (
              <MobileHeader
                showBack
                title={<Title slug={slug} />}
                goBack={props.history.goBack}
              />
            )
          }

          const {
            ticker,
            percentChange24h,
            percentChange7d,
            priceUsd,
            icoPrice
          } = project

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
                      <MobileAssetChart
                        data={price.items}
                        slug={slug}
                        icoPrice={icoPrice}
                      />
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
    <PercentChanges
      className={styles.changes}
      changes={changes24h}
      label='24h'
    />
    <PercentChanges className={styles.changes} changes={changes7d} label='7d' />
  </div>
)

export default MobileDetailedPage

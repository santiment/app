import React, { useMemo } from 'react'
import emptyChartSvg from './emptyChart.svg'
import MiniChart from '../../../components/MiniChart'
import PercentChanges from '../../../components/PercentChanges'
import styles from './Card.module.scss'

export const NULL_MARKETCAP = '$ 0'

export const WatchlistAssetTemplate = ({ marketcap, data, change }) => {
  const noMarketcap = marketcap === NULL_MARKETCAP
  return (
    <>
      <div className={styles.marketcap}>
        {marketcap}
        {noMarketcap ? (
          <img src={emptyChartSvg} alt='empty chart' />
        ) : (
          <MiniChart
            valueKey='marketcap'
            data={data}
            change={change}
            width={90}
          />
        )}
      </div>
      <div className={styles.change}>
        {noMarketcap ? (
          'No assets'
        ) : (
          <>
            <PercentChanges changes={change} />
            &nbsp;&nbsp; total cap, 7d
          </>
        )}
      </div>
    </>
  )
}

export const WatchlistAddressTemplate = ({ watchlist }) => {
  const { listItems } = watchlist

  const noAddresses = !listItems || listItems.length === 0

  const { tickers, count } = useMemo(
    () => {
      const items = listItems
        .map(({ blockchainAddress }) => blockchainAddress.infrastructure)
        .filter(Boolean)

      return {
        tickers: [...new Set(items)],
        count: items.length
      }
    },
    [listItems]
  )

  return (
    <>
      <>
        {noAddresses ? (
          'No addresses'
        ) : (
          <div className={styles.info}>
            <div className={styles.addresses}>
              <div className={styles.countAddresses}>{count}</div> tracking
              address{count > 1 && 'es'}
            </div>

            <div className={styles.infrastructures}>
              {tickers.slice(0, 3).map(item => (
                <TickerLabel ticker={item} />
              ))}
            </div>
          </div>
        )}
      </>
    </>
  )
}

const TickerLabel = ({ ticker }) => <div className={styles.infra}>{ticker}</div>

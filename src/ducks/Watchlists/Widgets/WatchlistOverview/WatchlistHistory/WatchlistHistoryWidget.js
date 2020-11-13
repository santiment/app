import React from 'react'
import { generateWidgetData } from './utils'
import WatchlistHistoryTemplate from './WatchlistHistoryTemplate'
import styles from './WatchlistHistoryWidget.module.scss'

const WatchlistHistoryWidget = ({
  historyPrice,
  type,
  assetsAmount,
  exchangesAmount,
  top3 = [],
  marketcap,
  ...rest
}) => {
  const {
    marketcapFormatted,
    volumeFormatted,
    chartStats,
    volumeChanges,
    marketcapChanges
  } = generateWidgetData(historyPrice)

  return (
    <>
      <div className={styles.top}>
        <WatchlistHistoryTemplate
          stats={chartStats}
          change={marketcapChanges}
          label={`${type} marketcap`}
          metric='marketcap'
          value={marketcapFormatted}
          {...rest}
        />
        <WatchlistHistoryTemplate
          stats={chartStats}
          change={volumeChanges}
          label='Volume'
          metric='volume'
          value={volumeFormatted}
          {...rest}
        />
      </div>
    </>
  )
}

/*

  const top3Formatted = top3.map(
    ({ marketcapUsd, ticker }) =>
      `${ticker} ${getRelativeMarketcapInPercents(
        latestMarketcap,
        marketcapUsd
      )}%`
  )
* <div className={styles.bottom}>
          <Stat
            name='Assets:'
            values={[assetsAmount]}
            className={styles.stat}
          />
          {exchangesAmount && (
            <Stat
              name='Exchanges:'
              values={[exchangesAmount]}
              className={styles.stat}
            />
          )}
          <Stat
            name='Dominance:'
            values={top3Formatted}
            isLoading={!latestMarketcap}
            className={styles.stat}
          />
        </div>
* */

export default WatchlistHistoryWidget

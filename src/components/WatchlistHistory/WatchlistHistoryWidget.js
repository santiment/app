import React from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Panel from '@santiment-network/ui/Panel/Panel'
import Label from '@santiment-network/ui/Label'
import { generateWidgetData, getRelativeMarketcapInPercents } from './utils'
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
    latestMarketcap,
    marketcapFormatted,
    volumeFormatted,
    chartStats,
    volumeChanges,
    marketcapChanges
  } = generateWidgetData(historyPrice)

  return (
    <Panel className={styles.wrapper}>
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
      {false && (
        <div className={styles.bottom}>
          <div className={styles.stat}>
            <Label className={styles.statName}>Assets:</Label>
            <Label className={styles.statValue}>{assetsAmount}</Label>
          </div>
          {exchangesAmount && (
            <div className={styles.stat}>
              <Label className={styles.statName}>Exchanges:</Label>
              <Label className={styles.statValue}>{exchangesAmount}</Label>
            </div>
          )}
          <div className={styles.stat}>
            <Label className={styles.statName}>Dominance:</Label>
            {top3.map(({ ticker, marketcapUsd }) => (
              <Label
                className={cx(
                  styles.statValue,
                  !latestMarketcap && styles.transparent
                )}
                key={ticker}
              >
                {ticker}{' '}
                {getRelativeMarketcapInPercents(latestMarketcap, marketcapUsd)}%
                {!latestMarketcap && <Loader className={styles.loader} />}
              </Label>
            ))}
          </div>
        </div>
      )}
    </Panel>
  )
}

export default WatchlistHistoryWidget

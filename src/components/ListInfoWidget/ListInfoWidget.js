import React from 'react'
import { Panel, Label } from '@santiment-network/ui'
import { calcPercentageChange } from '../../utils/utils'
import { statsForGraphics } from '../Watchlists/WatchlistCard'
import ListInfoWidgetItem from './ListInfoWidgetItem'
import styles from './ListInfoWidget.module.scss'

const ListInfoWidget = ({
  historyPrice,
  type,
  assetsAmount,
  exchangesAmount,
  top3 = [],
  ...rest
}) => {
  const { marketcap: latestMarketcap, volume: latestVolume } =
    historyPrice.slice(-1)[0] || {}
  const { marketcap, volume } = historyPrice.slice(0, 1)[0] || {}
  const changeMarketcap = calcPercentageChange(marketcap, latestMarketcap)
  const changeVolume = calcPercentageChange(volume, latestVolume)
  const chartStats = statsForGraphics(historyPrice)

  return (
    <Panel className={styles.wrapper}>
      <div className={styles.top}>
        <ListInfoWidgetItem
          stats={chartStats}
          change={changeMarketcap}
          label={`${type} marketcap`}
          metric='marketcap'
          value={latestMarketcap}
          {...rest}
        />
        <ListInfoWidgetItem
          stats={chartStats}
          change={changeVolume}
          label='Volume'
          metric='volume'
          value={latestVolume}
          {...rest}
        />
      </div>
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
            <Label className={styles.statValue} key={ticker}>
              {ticker} {((marketcapUsd * 100) / latestMarketcap).toFixed(2)}%
            </Label>
          ))}
        </div>
      </div>
    </Panel>
  )
}

export default ListInfoWidget

import React from 'react'
import { Panel } from '@santiment-network/ui'
import { calcPercentageChange } from '../../utils/utils'
import { statsForGraphics } from '../Watchlists/WatchlistCard'
import ListInfoWidgetItem from './ListInfoWidgetItem'
import styles from './ListInfoWidget.module.scss'

const ListInfoWidget = ({ historyPrice, type, ...rest }) => {
  const { marketcap: latestMarketcap, volume: latestVolume } =
    historyPrice.slice(-1)[0] || {}
  const { marketcap, volume } = historyPrice.slice(0, 1)[0] || {}
  const changeMarketcap = calcPercentageChange(marketcap, latestMarketcap)
  const changeVolume = calcPercentageChange(volume, latestVolume)
  const chartStats = statsForGraphics(historyPrice)

  return (
    <Panel className={styles.wrapper}>
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
    </Panel>
  )
}

export default ListInfoWidget

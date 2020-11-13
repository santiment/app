import React, { useState } from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import GetWatchlistHistory from '../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistHistory/GetWatchlistHistory'
import WatchlistAnomalies from '../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/WatchlistAnomalies'
import { RANGES } from '../../../ducks/Watchlists/Widgets/WatchlistOverview/constants'
import styles from '../Watchlist.module.scss'

const WatchlistPriceWidget = ({
  type,
  filterType,
  listId,
  toggleAssetsFiltering,
  trendingAssets,
  items
}) => {
  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  return (
    <Panel className={styles.overviewInfo}>
      <GetWatchlistHistory
        type={type}
        range={range}
        changeRange={changeRange}
        assetsAmount={items.length}
        top3={items.slice(0, 3)}
        id={listId}
      />
      <WatchlistAnomalies
        trends={trendingAssets}
        range={range}
        type={filterType}
        assetsAmount={items.length}
        changeRange={changeRange}
        onFilterAssets={toggleAssetsFiltering}
      />
    </Panel>
  )
}

export default WatchlistPriceWidget

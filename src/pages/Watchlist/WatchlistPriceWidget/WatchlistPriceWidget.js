import React, { useState } from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Widget from '../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistHistory/Widget'
import WatchlistAnomalies from '../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/WatchlistAnomalies'
import { RANGES } from '../../../ducks/Watchlists/Widgets/WatchlistOverview/constants'
import styles from './index.module.scss'

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

  function changeRange () {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  return (
    <Panel className={styles.overviewInfo}>
      <Widget type={type} range={range} changeRange={changeRange} id={listId} />
      {toggleAssetsFiltering && (
        <WatchlistAnomalies
          trends={trendingAssets}
          range={range}
          type={filterType}
          assetsAmount={items.length}
          changeRange={changeRange}
          onFilterAssets={toggleAssetsFiltering}
        />
      )}
    </Panel>
  )
}

export default WatchlistPriceWidget

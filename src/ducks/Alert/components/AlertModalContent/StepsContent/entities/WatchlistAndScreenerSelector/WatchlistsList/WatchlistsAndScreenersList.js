import React, { useCallback } from 'react'
import WatchlistsAndScreenersListItem from './WatchlistsListItem/WatchlistsAndScreenersListItem'
import styles from './WatchlistsAndScreenersList.module.scss'

const List = () => {}
const AutoSizer = () => {}
const CellMeasurer = () => {}
function CellMeasurerCache() {}

const ROW_HEIGHT = 66
const MAX_SHOWING_ITEMS = 5

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: ROW_HEIGHT,
})

const WatchlistsAndScreenersList = ({ items, selectedWatchlist, onSelect, isSocial }) => {
  const rowRenderer = useCallback(
    ({ key, index, style, parent }) => {
      const item = items[index]

      const isSelectedItem = +item.id === +selectedWatchlist

      return (
        <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
          {({ registerChild }) => (
            <WatchlistsAndScreenersListItem
              ref={registerChild}
              style={style}
              item={item}
              isSelectedItem={isSelectedItem}
              onSelect={onSelect}
            />
          )}
        </CellMeasurer>
      )
    },
    [items, selectedWatchlist],
  )

  const wrapperStyles = {
    height: isSocial ? '393px' : '458px',
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      {items.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.list}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowCount={items.length}
              overscanRowCount={MAX_SHOWING_ITEMS}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </div>
  )
}

export default WatchlistsAndScreenersList

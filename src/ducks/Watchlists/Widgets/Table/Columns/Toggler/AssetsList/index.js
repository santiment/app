import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Column from '../Columns/Column'
import styles from '../Category.module.scss'

const ROW_HEIGHT = 32

const AssetsList = ({
  items,
  activeKeys,
  currentSearch,
  filteredColumns,
  onColumnToggle
}) => {
  const [filteredItems, filterItems] = useState(items)

  useEffect(() => {
    const filtered = items.filter(({ item: { key } }) => {
      const isActive = activeKeys && activeKeys.includes(key)
      const isHide =
        isActive || (currentSearch && !filteredColumns.includes(key))

      return !isHide
    })
    filterItems(filtered)
  }, [items, activeKeys, currentSearch, filteredColumns])

  const rowRenderer = ({ index, key, style }) => {
    const item = filteredItems[index].item

    return (
      <div key={key} style={style}>
        <Column
          key={item.key}
          column={item}
          onColumnToggle={onColumnToggle}
          isActive={false}
          className={cx(styles.column, currentSearch && styles.searchedColumn)}
        />
      </div>
    )
  }

  return (
    <div className={styles.virtualizedContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={filteredItems.length}
            overscanRowCount={20}
            rowRenderer={rowRenderer}
            className={styles.virtualizedList}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsList

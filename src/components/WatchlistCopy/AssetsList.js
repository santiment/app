import React from 'react'
import { AutoSizer, List } from 'react-virtualized'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './AssetsList.module.scss'

const ROW_HEIGHT = 32

const AssetsList = ({ items, selectedItems, onToggleAsset }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isSelectedAsset = selectedItems.has(id)
    return (
      <div
        key={key}
        className={styles.project}
        style={style}
        onClick={() => onToggleAsset(id)}
      >
        <Checkbox isActive={isSelectedAsset} className={styles.checkbox} />
        <Label className={styles.name}>{name}</Label>
        <Label accent='waterloo'>({ticker})</Label>
      </div>
    )
  }

  const wrapperStyles = {
    height: items.length > 4 ? '145px' : `${32 * items.length}px`,
    paddingRight: items.length > 4 ? '0' : `5px`
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsList

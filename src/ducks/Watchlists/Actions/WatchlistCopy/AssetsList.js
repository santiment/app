import React from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './AssetsList.module.scss'

const ROW_HEIGHT = 32

const AssetsList = ({ items, selectedItems, onToggleAsset, classes }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isSelectedAsset = selectedItems.has(id)
    return (
      <div
        key={key}
        className={cx(styles.project, classes.asset)}
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
    '--height': items.length > 4 ? '145px' : `${32 * items.length}px`,
    '--padding-right': items.length > 4 ? '0' : `5px`
  }

  return (
    <div style={wrapperStyles} className={cx(styles.wrapperList, classes.list)}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
            className={styles.list}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsList

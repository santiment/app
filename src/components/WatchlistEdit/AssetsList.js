import React from 'react'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import { hasAssetById } from '../WatchlistPopup/WatchlistsPopup'
import styles from './AssetsList.module.scss'

const ROW_HEIGHT = 32

const AssetsList = ({
  items = [],
  listItems,
  isContained,
  onToggleProject
}) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isAssetInList = hasAssetById({ listItems, id })
    return (
      <div key={key} className={styles.project} style={style}>
        <div>
          <Label className={styles.name}>{name}</Label>
          <Label accent='waterloo'>({ticker})</Label>
        </div>
        <Button
          className={styles.actionBtn}
          accent={isContained ? 'grey' : 'positive'}
          disabled={isContained ? false : isAssetInList}
          onClick={() =>
            onToggleProject({
              project: items[index],
              listItems,
              isAssetInList
            })
          }
        >
          <Icon type={isContained ? 'remove' : 'plus-round'} />
        </Button>
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

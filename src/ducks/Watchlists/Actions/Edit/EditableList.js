import React from 'react'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import { hasAddress, hasAssetById } from '../../utils'
import styles from './AssetsList.module.scss'

const ROW_HEIGHT = 32

const rowAssetsRenderer = ({
  key,
  index,
  style,
  listItems,
  items,
  isContained,
  onToggle
}) => {
  const { name, ticker, id } = items[index]
  const isAssetInList = hasAssetById({ listItems, id })
  return (
    <div key={key} className={styles.project} style={style}>
      <div>
        <Label className={styles.name}>{name}</Label>
        <Label accent='waterloo'>{ticker}</Label>
      </div>
      <Button
        className={styles.actionBtn}
        accent={isContained ? 'grey' : 'positive'}
        disabled={isContained ? false : isAssetInList}
        onClick={() =>
          onToggle({
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

export const rowAddressRenderer = ({
  key,
  index,
  style,
  listItems,
  items,
  isContained,
  onToggle
}) => {
  const address = items[index]
  const isInList = hasAddress(listItems, address)

  return (
    <div key={key} className={styles.project} style={style}>
      <div>
        <Label className={styles.name}>{address}</Label>
      </div>
      <Button
        className={styles.actionBtn}
        accent={isContained ? 'grey' : 'positive'}
        disabled={isContained ? false : isInList}
        onClick={() =>
          onToggle({
            item: items[index],
            listItems,
            isInList
          })
        }
      >
        <Icon type={isContained ? 'remove' : 'plus-round'} />
      </Button>
    </div>
  )
}

const EditableList = ({
  items = [],
  listItems,
  isContained,
  onToggle,
  rowRenderer = rowAssetsRenderer
}) => {
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
            rowRenderer={props =>
              rowRenderer({ ...props, listItems, items, isContained, onToggle })
            }
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default EditableList

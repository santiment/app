import React from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import { hasAddress, hasAssetById } from '../../utils'
import styles from './AssetsList.module.scss'
import Labels from '../../../HistoricalBalance/Address/Labels'

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
  const source = items[index]
  const { address } = source
  const isInList = hasAddress(listItems, source)

  return (
    <div key={key} className={styles.address} style={style}>
      <div className={styles.container}>
        <Label className={styles.name}>{address}</Label>
        <div className={styles.info}>
          <Labels settings={source} showCount={2} />
        </div>
      </div>
      <Button
        className={cx(styles.actionBtn, styles.deleteAddress)}
        accent={isContained ? 'grey' : 'positive'}
        disabled={isContained ? false : isInList}
        onClick={() =>
          onToggle({
            item: source,
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
  height,
  rowHeight = ROW_HEIGHT,
  rowRenderer = rowAssetsRenderer
}) => {
  const wrapperStyles = {
    height: height || (items.length > 4 ? '145px' : `${32 * items.length}px`),
    paddingRight: items.length > 4 ? '0' : `5px`
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={styles.list}
            width={width}
            height={height}
            rowHeight={rowHeight}
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

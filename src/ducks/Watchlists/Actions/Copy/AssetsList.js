import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { InputWithIcon } from '@santiment-network/ui/Input'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { BLOCKCHAIN_ADDRESS } from '../../detector'
import styles from './AssetsList.module.scss'
import inputStyles from '../../../../components/BlockchainLabelsSelector/BlockchainLabelsSelector.module.scss'

const List = () => {}
const AutoSizer = () => {}

const ROW_HEIGHT = 32

const AssetsList = ({ items, selectedItems, onToggleAsset, classes, withSearch = false, type }) => {
  const [filter, setFilter] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (!selectedItems) {
      setFilteredItems(items)
      return
    }
    if (!withSearch) return
    let filteredItems = [...items]
    if (filter.length > 0) {
      const normalizedFilter = filter.trim().toLowerCase()
      filteredItems =
        type === BLOCKCHAIN_ADDRESS
          ? filteredItems.filter(({ blockchainAddress }) =>
              blockchainAddress.address.toLowerCase().includes(normalizedFilter),
            )
          : filteredItems.filter(({ name, ticker }) => {
              return (
                name.toLowerCase().includes(normalizedFilter) ||
                ticker.toLowerCase().includes(normalizedFilter)
              )
            })
    }
    filteredItems.sort((a, b) => {
      let lookupId = type === BLOCKCHAIN_ADDRESS ? a.blockchainAddress.address : a.id
      const aSelected = +selectedItems.has(lookupId)
      lookupId = type === BLOCKCHAIN_ADDRESS ? b.blockchainAddress.address : b.id
      const bSelected = +selectedItems.has(lookupId)
      return bSelected - aSelected
    })
    setFilteredItems(filteredItems)
  }, [filter, selectedItems])

  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id, blockchainAddress } = filteredItems[index]
    const lookupId = type === BLOCKCHAIN_ADDRESS ? blockchainAddress.address : id
    const isSelectedAsset = selectedItems.has(lookupId)

    return (
      <div
        key={key}
        className={cx(styles.project, classes.asset)}
        style={style}
        onClick={() => onToggleAsset(lookupId)}
      >
        <Checkbox isActive={isSelectedAsset} className={styles.checkbox} />
        <Label className={styles.name}>
          {type === BLOCKCHAIN_ADDRESS ? blockchainAddress.address : name}
        </Label>
        {type !== BLOCKCHAIN_ADDRESS && <Label accent='casper'>{ticker}</Label>}
      </div>
    )
  }

  const wrapperStyles = {
    '--height': filteredItems.length > 4 ? '145px' : `${32 * filteredItems.length}px`,
    '--padding-right': filteredItems.length > 4 ? '0' : `5px`,
  }

  return (
    <>
      {withSearch && (
        <InputWithIcon
          type='text'
          icon='search-small'
          iconPosition='left'
          onChange={(e) => setFilter(e.target.value)}
          defaultValue={filter}
          className={inputStyles.search}
          placeholder='Type to search'
        />
      )}
      <div style={wrapperStyles} className={cx(styles.wrapperList, classes.list)}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowHeight={ROW_HEIGHT}
              rowCount={filteredItems.length}
              overscanRowCount={5}
              rowRenderer={rowRenderer}
              className={styles.list}
            />
          )}
        </AutoSizer>
      </div>
    </>
  )
}

export default AssetsList

import React, { useState, useRef, useEffect, useMemo } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Panel from '@santiment-network/ui/Panel'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import { useTheme } from '../../../../../stores/ui/theme'
import { useAllProjects, useOnClickOutside } from './hooks'
import styles from './index.module.scss'
import cardStyles from '../../../../../ducks/Watchlists/Widgets/Table/AssetCard.module.scss'
import fieldStyles from '../../../../../ducks/Studio/Sidebar/ProjectSelector/index.module.scss'

const VIEW_ITEM_COUNT = 4

const Assets = ({ watchlist, onChange }) => {
  const ref = useRef()
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [filter, setFilter] = useState('')
  const watchListItems = useMemo(
    () => (watchlist ? watchlist.listItems.map(l => l.project) : []),
    [watchlist]
  )
  const [items, setItems] = useState(watchListItems)
  const watchListIDs = useMemo(
    () =>
      new Set(
        items.map(i => i.id),
        [items]
      )
  )
  const [checkedItems, setCheckedItems] = useState(watchListItems)
  const { isNightMode } = useTheme()
  const { data } = useAllProjects(filter.toLowerCase())
  const assets = useMemo(
    () => data.filter(item => !watchListIDs.has(item.id)),
    [data, watchListIDs]
  )
  const [showItems, setShowItems] = useState(false)

  useEffect(() => {
    const showTimeout = setTimeout(() => setShowItems(true), 300)
    return () => clearTimeout(showTimeout)
  }, [])

  useOnClickOutside(ref, () => {
    setFilter('')
    setIsSearchMode(false)
  })

  useEffect(() => {
    let items = watchListItems
    if (filter && filter.length > 0) {
      const _filter = filter.toLowerCase()
      const filterHelper = item =>
        item.name.toLowerCase().includes(_filter) ||
        item.ticker.toLowerCase().includes(_filter)
      items = items.filter(filterHelper)
    }
    setItems(items)
  }, [filter, watchListItems])

  const checkboxClickHandler = (item, newValue) =>
    setCheckedItems(old => {
      const items = [...old]
      const index = items.findIndex(i => i.id === item.id)
      if (index === -1 && newValue) {
        items.push(item)
      } else if (index > -1 && !newValue) {
        items.splice(index, 1)
      }
      if (onChange) onChange(items)
      return items
    })

  return (
    <>
      <Label accent='waterloo' className={styles.description__label}>
        Assets
      </Label>
      <div
        ref={ref}
        className={cx(fieldStyles.selector, styles.selector)}
        onClick={() => {
          if (!isSearchMode) {
            setIsSearchMode(true)
            setFilter('')
          }
        }}
      >
        {isSearchMode ? (
          <Input
            autoFocus
            maxLength='25'
            autoComplete='off'
            placeholder='Type to search'
            className={styles.searchInput}
            onChange={({ currentTarget: { value } }) => setFilter(value)}
          />
        ) : (
          <AssetItemDropdown checkedItems={checkedItems} />
        )}

        <Icon
          onClick={() => {
            if (isSearchMode) {
              setFilter('')
              setIsSearchMode(false)
            }
          }}
          type='arrow-down'
          className={cx(
            fieldStyles.arrow,
            styles.arrow,
            isSearchMode && styles.arrowup
          )}
        />

        <Panel className={cx(styles.panel, !isSearchMode && styles.hide)}>
          {showItems && (
            <>
              <h6 className={styles.groupLabel}>Contained in watchlist</h6>
              {items.map(item => {
                return (
                  <AssetItem
                    onClick={checkboxClickHandler}
                    isActive={checkedItems.includes(item)}
                    key={item.id}
                    item={item}
                    isNightMode={isNightMode}
                  />
                )
              })}
              <h6 className={cx(styles.groupLabel, styles.groupLabel_mt)}>
                Assets
              </h6>
              {assets.map(item => {
                return (
                  <AssetItem
                    onClick={checkboxClickHandler}
                    isActive={checkedItems.includes(item)}
                    key={item.id}
                    item={item}
                    isNightMode={isNightMode}
                  />
                )
              })}
            </>
          )}
        </Panel>
      </div>
    </>
  )
}

const AssetItemDropdown = ({ checkedItems }) => (
  <>
    {checkedItems.length === 0 && (
      <span className={cardStyles.ticker}>Select asset for watchlist</span>
    )}
    {checkedItems.length > 0 &&
      checkedItems.slice(0, VIEW_ITEM_COUNT).map((item, index) => {
        const hasDots =
          checkedItems.length > VIEW_ITEM_COUNT && index === VIEW_ITEM_COUNT - 1
        const hasComma =
          index < VIEW_ITEM_COUNT - 1 && index < checkedItems.length - 1
        const seprator = hasComma ? ', ' : hasDots ? '...' : ''
        return (
          <div className={cx(cardStyles.name, styles.mrhalf)} key={item.id}>
            {item.name}{' '}
            <span className={cx(styles.mlzero, cardStyles.ticker)}>
              {item.ticker}
            </span>{' '}
            {seprator}
          </div>
        )
      })}
  </>
)

const AssetItem = ({ item, isNightMode, isActive, onClick }) => {
  const src = (isNightMode && item.darkLogoUrl) || item.logoUrl

  return (
    <div className={styles.assetItem} onClick={() => onClick(item, !isActive)}>
      <Checkbox isActive={isActive} />{' '}
      <img src={src} loading='lazy' className={styles.logo} alt={item.name} />{' '}
      {item.name} <span className={cardStyles.ticker}>{item.ticker}</span>
    </div>
  )
}

export default Assets

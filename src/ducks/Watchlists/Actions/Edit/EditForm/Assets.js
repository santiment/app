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
  const watchlistProjects = useMemo(
    () => (watchlist ? watchlist.listItems.map(l => l.project) : []),
    [watchlist]
  )
  const [filteredProjects, setFilteredProjects] = useState(watchlistProjects)
  const watchListIDs = useMemo(
    () =>
      new Set(
        filteredProjects.map(i => i.id),
        [filteredProjects]
      )
  )
  const [checkedItems, setCheckedItems] = useState(watchlistProjects)
  const { isNightMode } = useTheme()
  const { data } = useAllProjects(filter.toLowerCase())
  const unusedProjects = useMemo(
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
    let items = watchlistProjects
    if (filter && filter.length > 0) {
      const lowercaseFilter = filter.toLowerCase()
      const filterHelper = ({ name, ticker }) =>
        name.toLowerCase().includes(lowercaseFilter) ||
        ticker.toLowerCase().includes(lowercaseFilter)
      items = items.filter(filterHelper)
    }
    setFilteredProjects(items)
  }, [filter, watchlistProjects])

  const checkboxClickHandler = (item, newValue) =>
    setCheckedItems(old => {
      let changed = false
      let items = new Set(old)
      const has = items.has(item)
      if (!has && newValue) {
        items.add(item)
        changed = true
      } else if (has && !newValue) {
        items.delete(item)
        changed = true
      }
      if (changed) {
        items = Array.from(items)
        if (onChange) onChange(items)
        return items
      }
      return old
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
              {filteredProjects.map(item => {
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
              {unusedProjects.map(item => {
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

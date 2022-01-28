import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Panel from '@santiment-network/ui/Panel'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import { useTheme } from '../../../../../stores/ui/theme'
import { useOnClickOutside } from '../../../../../hooks/click'
import { useEditAssets } from './hooks'
import styles from './index.module.scss'
import cardStyles from '../../../../../ducks/Watchlists/Widgets/Table/AssetCard.module.scss'
import fieldStyles from '../../../../../ducks/Studio/Sidebar/ProjectSelector/index.module.scss'

const VIEW_ITEM_COUNT = 4

const Assets = ({ watchlist, onChange, preSelectedItems }) => {
  const ref = useRef()
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [filter, setFilter] = useState('')
  const {
    checkedItems,
    filteredWatchlist,
    toggleWatchlistProject,
    unusedProjects
  } = useEditAssets(
    filter.toLowerCase(),
    watchlist ? watchlist.listItems.map(l => l.project) : [],
    onChange,
    preSelectedItems
  )
  const { isNightMode } = useTheme()
  const [showItems, setShowItems] = useState(false)

  useEffect(() => {
    const showTimeout = setTimeout(() => setShowItems(true), 300)
    return () => clearTimeout(showTimeout)
  }, [])

  useOnClickOutside(ref, () => {
    setFilter('')
    setIsSearchMode(false)
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
              {filteredWatchlist.map(item => {
                return (
                  <AssetItem
                    toggleWatchlistProject={toggleWatchlistProject}
                    isActive={true}
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
                    toggleWatchlistProject={toggleWatchlistProject}
                    isActive={false}
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
      <span className={cx(cardStyles.ticker, styles.mlzero)}>
        Select asset for watchlist
      </span>
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
            <span className={cx(cardStyles.ticker, styles.mlzero)}>
              {item.ticker}
            </span>{' '}
            {seprator}
          </div>
        )
      })}
  </>
)

const AssetItem = ({ item, isNightMode, isActive, toggleWatchlistProject }) => {
  const src = (isNightMode && item.darkLogoUrl) || item.logoUrl

  return (
    <div
      className={styles.assetItem}
      onClick={() => toggleWatchlistProject(item)}
    >
      <Checkbox isActive={isActive} />{' '}
      <img src={src} loading='lazy' className={styles.logo} alt={item.name} />{' '}
      {item.name} <span className={cardStyles.ticker}>{item.ticker}</span>
    </div>
  )
}

export default Assets

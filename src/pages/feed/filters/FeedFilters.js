import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import AlertsAndInsightsFilter, {
  AUTHOR_TYPES
} from './AlertsAndInsightsFilter'
import FeedWatchlistsFilter from './FeedWatchlistsFilter'
import FeedAssetsFilter from './FeedAssetsFilter'
import { getDefaultFilters } from '../GeneralFeed/GeneralFeed'
import SmoothDropdownItem from '../../../components/SmoothDropdown/SmoothDropdownItem'
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown'
import styles from './FeedFilters.module.scss'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'

let timeoutId

const FeedFilters = props => {
  return (
    <>
      <DesktopOnly>
        <FiltersDesktopWrapper>
          <FeedContentWrapper {...props} />
        </FiltersDesktopWrapper>
      </DesktopOnly>
      <MobileOnly>
        <FiltersMobileWrapper>
          <FeedContentWrapper {...props} />
        </FiltersMobileWrapper>
      </MobileOnly>
    </>
  )
}

const FeedContentWrapper = ({
  filters,
  handleFiltersChange,
  enableAlertsInsights
}) => {
  const onUpdateAuthor = useCallback(author => {
    console.log('on update a', author)
    handleFiltersChange({
      ...filters,
      author
    })
  }, [])
  const onUpdateWatchlists = useCallback(watchlists => {
    handleFiltersChange({
      ...filters,
      watchlists
    })
  }, [])
  const onUpdateAssets = useCallback(assets => {
    handleFiltersChange({
      ...filters,
      assets
    })
  }, [])

  console.log(filters.author)

  useEffect(
    () => {
      onUpdateAuthor(
        !enableAlertsInsights ? AUTHOR_TYPES.OWN : AUTHOR_TYPES.ALL
      )
    },
    [enableAlertsInsights]
  )

  return (
    <div className={styles.dialogContent}>
      <div className={styles.header}>
        <div className={styles.filterBy}>Filter by</div>
        <div
          className={styles.resetBlock}
          onClick={() => handleFiltersChange(getDefaultFilters())}
        >
          <Icon type='close-medium' className={styles.resetIcon} />
          Reset filter
        </div>
      </div>

      <FeedAssetsFilter ids={filters.assets} onUpdateAssets={onUpdateAssets} />

      <FeedWatchlistsFilter
        ids={filters.watchlists}
        onUpdateWatchlists={onUpdateWatchlists}
      />

      {enableAlertsInsights && (
        <AlertsAndInsightsFilter
          selected={filters.author}
          onUpdateAuthor={onUpdateAuthor}
        />
      )}
    </div>
  )
}

const FiltersDesktopWrapper = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const setClosed = () => {
    timeoutId = setTimeout(() => setOpen(false), 150)
  }

  const setOpened = () => {
    timeoutId && clearTimeout(timeoutId)
    setOpen(true)
  }

  return (
    <SmoothDropdown
      verticalOffset={8}
      className={cx(styles.smoothDd, 'container')}
    >
      <SmoothDropdownItem
        className={styles.trigger}
        trigger={
          <div className={cx(styles.trigger, isOpen && styles.openState)}>
            <Icon type='filter' className={styles.iconFilter} />
          </div>
        }
        onOpen={() => setOpened()}
        onClose={() => setClosed()}
        ddParams={{
          position: 'start',
          offsetX: -423
        }}
      >
        <div onMouseEnter={() => setOpened()} onMouseLeave={() => setClosed()}>
          {children}
        </div>
      </SmoothDropdownItem>
    </SmoothDropdown>
  )
}

const FiltersMobileWrapper = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        <div className={cx(styles.trigger, isOpen && styles.openState)}>
          <Icon type='filter' className={styles.iconFilter} />
        </div>
      }
      classes={styles}
    >
      {children}
    </Dialog>
  )
}
export default FeedFilters

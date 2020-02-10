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
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './FeedFilters.module.scss'

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
  return (
    <Tooltip
      closeTimeout={200}
      position='bottom'
      align='end'
      className={styles.tooltip}
      passOpenStateAs='isActive'
      trigger={
        <div className={styles.trigger}>
          <Icon type='filter' className={styles.iconFilter} />
        </div>
      }
    >
      {children}
    </Tooltip>
  )
}

const FiltersMobileWrapper = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      title={'Feed filters'}
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

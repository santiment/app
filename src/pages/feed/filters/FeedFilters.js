import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import AlertsAndInsightsFilter, {
  AUTHOR_TYPES
} from './AlertsAndInsightsFilter'
import styles from './FeedFilters.module.scss'
import FeedWatchlistsFilter from './FeedWatchlistsFilter'
import FeedAssetsFilter from './FeedAssetsFilter'

const FeedFilters = ({
  filters,
  handleFiltersChange,
  enableAlertsInsights
}) => {
  const [isOpen, setOpen] = useState(true)

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
  })

  const onUpdateAssets = useCallback(assets => {
    handleFiltersChange({
      ...filters,
      assets
    })
  })

  useEffect(
    () => {
      onUpdateAuthor(
        !enableAlertsInsights ? AUTHOR_TYPES.OWN : AUTHOR_TYPES.ALL
      )
    },
    [enableAlertsInsights]
  )

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
      <Dialog.ScrollContent className={styles.dialogContent}>
        <div className={styles.header}>
          <div className={styles.filterBy}>Filter by</div>
        </div>

        <FeedAssetsFilter
          ids={filters.assets}
          onUpdateAssets={onUpdateAssets}
        />

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
      </Dialog.ScrollContent>
    </Dialog>
  )
}

/*
* <div className={styles.resetBlock} onClick={()=>handleFiltersChange(DEFAULT_FILTER)}>
          <Icon type='close-medium' className={styles.resetIcon}/>
          Reset filter
        </div>
* */
export default FeedFilters

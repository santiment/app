import React, { useEffect } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Filter from '../../../components/Filter/Filter'
import AlertsAndInsightsFilter, { AUTHOR_TYPES } from './AlertsAndInsightsFilter'
import FeedWatchlistsFilter from './FeedWatchlistsFilter'
import FeedAssetsFilter from './FeedAssetsFilter'
import { getDefaultFilters } from '../GeneralFeed/utils'
import styles from './FeedFilters.module.scss'

const FeedFilters = (props) => {
  return (
    <Filter dialogTitle='Feed filters'>
      <FeedContentWrapper {...props} />
    </Filter>
  )
}

const FeedContentWrapper = ({ filters, handleFiltersChange, enableAlertsInsights }) => {
  const onUpdateAuthor = (author) => {
    handleFiltersChange({
      ...filters,
      author,
    })
  }
  const onUpdateWatchlists = (watchlists) => {
    handleFiltersChange({
      ...filters,
      watchlists,
    })
  }
  const onUpdateAssets = (assets) => {
    handleFiltersChange({
      ...filters,
      assets,
    })
  }

  useEffect(() => {
    onUpdateAuthor(!enableAlertsInsights ? AUTHOR_TYPES.OWN : filters.author)
  }, [enableAlertsInsights])

  return (
    <div className={styles.dialogContent}>
      <div className={styles.header}>
        <div className={styles.filterBy}>Filter by</div>
        <div className={styles.resetBlock} onClick={() => handleFiltersChange(getDefaultFilters())}>
          <Icon type='close-medium' className={styles.resetIcon} />
          Reset filter
        </div>
      </div>

      <FeedAssetsFilter ids={filters.assets} onUpdate={onUpdateAssets} />

      <FeedWatchlistsFilter ids={filters.watchlists} onUpdate={onUpdateWatchlists} />

      {enableAlertsInsights && (
        <AlertsAndInsightsFilter selected={filters.author} onUpdate={onUpdateAuthor} />
      )}
    </div>
  )
}

export default FeedFilters

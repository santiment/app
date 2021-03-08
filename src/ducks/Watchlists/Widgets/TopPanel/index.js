import React, { useState } from 'react'
import cx from 'classnames'
import Title from './Title'
import Filter from '../Filter'
import Widgets from './Widgets'
import BaseActions from './BaseActions'
import Share from '../../Actions/Share'
import { useIsAuthor } from '../../gql/list/hooks'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import styles from './index.module.scss'

const TopPanel = ({
  name,
  watchlist,
  isLoggedIn,
  projectsCount,
  isDefaultScreener,
  isUpdatingWatchlist,
  updateWatchlistFunction,
  type,
  widgets,
  setWidgets,
  ...props
}) => {
  const { isAuthor, isAuthorLoading } = useIsAuthor(watchlist)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  function closeFilter () {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    }
  }

  return (
    <section className={cx(styles.wrapper, isFilterOpen && styles.open)}>
      <div className={styles.row}>
        <Title name={name} watchlist={watchlist} />
        <BaseActions
          type={type}
          watchlist={watchlist}
          onClick={closeFilter}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
        />
        {isUpdatingWatchlist && (
          <span className={styles.saving}>Saving...</span>
        )}
      </div>
      <div className={styles.row}>
        <div onClick={closeFilter} className={styles.row}>
          {isAuthor && !isDefaultScreener && (
            <>
              <Share watchlist={watchlist} isAuthor={isAuthor} />
              <div className={styles.divider} />
            </>
          )}
          {(isAuthor || isDefaultScreener) && (
            <>
              <ScreenerSignalDialog watchlistId={watchlist.id} />
              <div className={styles.divider} />
            </>
          )}
          <Widgets widgets={widgets} setWidgets={setWidgets} />
        </div>
        <Filter
          watchlist={watchlist}
          projectsCount={projectsCount}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
          isLoggedIn={isLoggedIn}
          isDefaultScreener={isDefaultScreener}
          setIsOpen={setIsFilterOpen}
          isOpen={isFilterOpen}
          updateWatchlistFunction={updateWatchlistFunction}
          {...props}
        />
      </div>
    </section>
  )
}

export default TopPanel

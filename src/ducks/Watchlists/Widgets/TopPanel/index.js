import React, { useState } from 'react'
import cx from 'classnames'
import BaseActions from './BaseActions'
import Widgets from './Widgets'
import Share from '../../Actions/Share'
import Filter from '../Filter'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import HelpPopup from '../../../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const TopPanel = ({
  name,
  description,
  id,
  watchlist,
  isAuthor,
  isAuthorLoading,
  isLoggedIn,
  assets,
  isDefaultScreener,
  ...props
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState(false)

  function closeFilter () {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    }
  }

  return (
    <section className={cx(styles.wrapper, isFilterOpen && styles.open)}>
      <div className={styles.row}>
        <h1 className={styles.name}>{name}</h1>
        {description && (
          <HelpPopup triggerClassName={styles.description}>
            {description}
          </HelpPopup>
        )}
        {id && (
          <BaseActions
            isAuthor={isAuthor}
            isPro={isPro}
            isAuthorLoading={isAuthorLoading}
            name={name}
            description={description}
            id={id}
            watchlist={watchlist}
            onClick={closeFilter}
          />
        )}
        {isUpdatingWatchlist && (
          <span className={styles.saving}>Saving...</span>
        )}
      </div>
      <div className={styles.row}>
        <div onClick={closeFilter} className={styles.row}>
          <Share watchlist={watchlist} isAuthor={isAuthor} />
          {!isDefaultScreener && <div className={styles.divider} />}
          {(isAuthor || isDefaultScreener) && (
            <>
              <ScreenerSignalDialog watchlistId={watchlist.id} />
              <div className={styles.divider} />
            </>
          )}
          <Widgets {...props} />
        </div>
        <Filter
          watchlist={watchlist}
          projectsCount={assets.length}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
          isLoggedIn={isLoggedIn}
          isDefaultScreener={isDefaultScreener}
          setIsOpen={setIsFilterOpen}
          isOpen={isFilterOpen}
          setIsUpdatingWatchlist={setIsUpdatingWatchlist}
          {...props}
        />
      </div>
    </section>
  )
}

export default TopPanel

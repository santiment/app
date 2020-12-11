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
  isLoggedIn,
  assets,
  isDefaultScreener,
  ...props
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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
        {isAuthor && id && (
          <BaseActions
            isAuthor={isAuthor}
            isPro={isPro}
            name={name}
            id={id}
            watchlist={watchlist}
            onClick={closeFilter}
          />
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
          isLoggedIn={isLoggedIn}
          isDefaultScreener={isDefaultScreener}
          setIsOpen={setIsFilterOpen}
          isOpen={isFilterOpen}
          {...props}
        />
      </div>
    </section>
  )
}

export default TopPanel

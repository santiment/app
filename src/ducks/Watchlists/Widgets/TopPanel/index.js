import React, { useState } from 'react'
import cx from 'classnames'
import BaseActions from './BaseActions'
import Widgets from './Widgets'
import Share from '../../Actions/Share'
import Filter from '../Filter'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import styles from './index.module.scss'

const TopPanel = ({
  name,
  id,
  watchlist,
  isAuthor,
  isLoggedIn,
  assets,
  isDefaultScreener,
  ...props
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={cx(styles.wrapper, isOpen && styles.open)}>
      <div className={styles.left}>
        <h1 className={styles.name}>{name}</h1>
        {isAuthor && (
          <BaseActions
            isAuthor={isAuthor}
            isPro={isPro}
            name={name}
            id={id}
            watchlist={watchlist}
          />
        )}
      </div>
      <div className={styles.right}>
        <Share watchlist={watchlist} isAuthor={isAuthor} />
        {!isDefaultScreener && <div className={styles.divider} />}
        {(isAuthor || isDefaultScreener) && (
          <>
            <ScreenerSignalDialog watchlistId={watchlist.id} />
            <div className={styles.divider} />
          </>
        )}
        <Widgets {...props} />
        <Filter
          watchlist={watchlist}
          projectsCount={assets.length}
          isAuthor={isAuthor}
          isLoggedIn={isLoggedIn}
          isDefaultScreener={isDefaultScreener}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          {...props}
        />
      </div>
    </section>
  )
}

export default TopPanel

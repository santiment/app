import React from 'react'
import cx from 'classnames'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import Share from '../../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import styles from '../index.module.scss'

const Actions = ({ watchlist, isAuthor }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      <BaseActions
        className={styles.edit}
        {...watchlist}
        watchlist={watchlist}
        isAuthor={isAuthor}
        isPro={isPro}
      />

      <Share
        className={styles.share}
        watchlist={watchlist}
        isAuthor={isAuthor}
      />
    </>
  )
}

export default Actions

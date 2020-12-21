import React from 'react'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import Share from '../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import { createAddressWatchlist } from '../../ducks/WatchlistAddressesTable/gql/mutations'
import styles from './index.module.scss'

const Actions = ({ watchlist, isAuthor }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      <BaseActions
        noItemsCheck
        className={styles.edit}
        {...watchlist}
        watchlist={watchlist}
        isAuthor={isAuthor}
        isPro={isPro}
        createWatchlist={createAddressWatchlist}
        type='watchlist'
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

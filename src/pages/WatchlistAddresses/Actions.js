import React from 'react'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { createAddressesWatchlist } from '../../ducks/Watchlists/gql/mutations'
import Share from '../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import { getAddressesWatchlistLink } from '../../ducks/Watchlists/url'
import styles from './index.module.scss'

const getShareLink = watchlist =>
  window.location.host + getAddressesWatchlistLink(watchlist)
const createWatchlist = (watchlist, setDialog) =>
  createAddressesWatchlist(watchlist).then(() => setDialog(false))

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
        createWatchlist={createWatchlist}
        type='watchlist'
      />

      <Share
        className={styles.share}
        watchlist={watchlist}
        customLink={getShareLink(watchlist)}
        isAuthor={isAuthor}
      />
    </>
  )
}

export default Actions

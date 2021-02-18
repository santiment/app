import React from 'react'
import { createWatchlist } from '../../ducks/WatchlistAddressesTable'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { getAddressesWatchlistLink } from '../../ducks/Watchlists/url'
import Share from '../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import { CopyLink } from '../../ducks/Studio/Header/Settings'
import styles from './index.module.scss'

const getShareLink = watchlist =>
  window.location.origin + getAddressesWatchlistLink(watchlist)

const Actions = ({ watchlist, isAuthor }) => {
  const { isPro } = useUserSubscriptionStatus()
  const shareLink = getShareLink(watchlist)

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
        customLink={shareLink}
        isAuthor={isAuthor}
      />
      <CopyLink className={styles.copy} shareLink={shareLink} />
    </>
  )
}

export default Actions

import React from 'react'
import { getSEOLinkFromIdAndTitle } from '../../utils/url'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { createAddressWatchlist } from '../../ducks/WatchlistAddressesTable/gql/mutations'
import Share from '../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import styles from './index.module.scss'

const getShareLink = ({ id, name }) =>
  window.location.host +
  `/watchlist/addresses/${getSEOLinkFromIdAndTitle(id, name)}`

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
        customLink={getShareLink(watchlist)}
        isAuthor={isAuthor}
      />
    </>
  )
}

export default Actions

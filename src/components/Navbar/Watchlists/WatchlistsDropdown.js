import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import WatchlistsAnon from '../../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import EmptySection from './EmptySection'
import CreateWatchlistBtn from './CreateWatchlistBtn'
import { getWatchlistLink } from '../../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { useUser } from '../../../stores/user'
import { useUserWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import { useAddressWatchlists } from '../../../ducks/Watchlists/gql/queries'
import { getAddressesWatchlistLink } from '../../../ducks/Watchlists/url'
import styles from './WatchlistsDropdown.module.scss'

const WatchlistsDropdown = ({ activeLink }) => {
  const [projectsWatchlists, loading] = useUserWatchlists()
  const addressesWatchlists = useAddressWatchlists().watchlists
  const { loading: isLoggedInPending, isLoggedIn } = useUser()
  const isLoading = loading || isLoggedInPending

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  if (!isLoggedIn) {
    return <WatchlistsAnon className={styles.anon} />
  }

  const watchlists = addressesWatchlists.concat(projectsWatchlists)

  return watchlists.length === 0 ? (
    <EmptySection watchlists={watchlists} />
  ) : (
    <>
      <WatchlistList watchlists={watchlists} activeLink={activeLink} />
      <CreateWatchlistBtn
        watchlists={watchlists}
        className={styles.watchlistBtn}
      />
    </>
  )
}

const WatchlistList = ({ watchlists, activeLink }) => (
  <div
    className={styles.wrapper}
    style={{
      minHeight:
        watchlists.length > 3 ? '100px' : `${32 * watchlists.length}px`,
      maxHeight: '100px'
    }}
  >
    <div className={styles.list}>
      {watchlists.map(watchlist => {
        const { name, id, isPublic, type } = watchlist
        const link =
          type === 'BLOCKCHAIN_ADDRESS'
            ? getAddressesWatchlistLink(watchlist)
            : getWatchlistLink(watchlist)
        return (
          <Button
            fluid
            variant='ghost'
            key={id}
            as={Link}
            className={styles.item}
            to={link}
            isActive={activeLink === link}
          >
            <span className={styles.watchlistName}>{name}</span>
            <VisibilityIndicator isPublic={isPublic} />
          </Button>
        )
      })}
    </div>
  </div>
)

export default WatchlistsDropdown

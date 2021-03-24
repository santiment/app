import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import WatchlistsAnon from '../../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import EmptySection from './EmptySection'
import CreateWatchlistBtn from './CreateWatchlistBtn'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { useUser } from '../../../stores/user'
import { getWatchlistLink } from '../../../ducks/Watchlists/url'
import { sortById } from '../../../utils/sortMethods'
import { getBlockMinHeight } from '../utils'
import Item from './Item'
import {
  useUserAddressWatchlists,
  useUserProjectWatchlists
} from '../../../ducks/Watchlists/gql/lists/hooks'
import styles from './WatchlistsDropdown.module.scss'

const WatchlistsDropdown = ({ activeLink }) => {
  const [projectsWatchlists, loading] = useUserProjectWatchlists()
  const [addressesWatchlists, loadingAddresses] = useUserAddressWatchlists()
  const { loading: isLoggedInPending, isLoggedIn } = useUser()
  const isLoading = loading || loadingAddresses || isLoggedInPending

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  if (!isLoggedIn) {
    return <WatchlistsAnon className={styles.anon} />
  }

  const watchlists = addressesWatchlists
    .concat(projectsWatchlists)
    .sort(sortById)

  return watchlists.length === 0 ? (
    <EmptySection />
  ) : (
    <>
      <WatchlistList watchlists={watchlists} activeLink={activeLink} />
      <CreateWatchlistBtn className={styles.watchlistBtn} />
    </>
  )
}

const WatchlistList = ({ watchlists, activeLink }) => (
  <div
    className={styles.wrapper}
    style={{
      minHeight: getBlockMinHeight(watchlists),
      maxHeight: '100px'
    }}
  >
    <div className={styles.list}>
      {watchlists.map((list, idx) => (
        <Item key={idx} link={getWatchlistLink(list)} activeLink={activeLink}>
          <span className={styles.watchlistName}>{list.name}</span>
          <VisibilityIndicator isPublic={list.isPublic} />
        </Item>
      ))}
    </div>
  </div>
)

export default WatchlistsDropdown

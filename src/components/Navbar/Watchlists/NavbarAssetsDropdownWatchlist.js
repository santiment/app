import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import WatchlistsAnon from '../../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import WatchlistsEmptySection from './WatchlistsEmptySection'
import CreateWatchlistBtn from './CreateWatchlistBtn'
import { getWatchlistLink } from '../../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { useUserWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../../pages/UserSelectors'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

const NavbarAssetsDropdownWatchlist = ({
  activeLink,
  isLoggedIn,
  isLoggedInPending
}) => {
  const [watchlists, loading] = useUserWatchlists()
  const isLoading = loading || isLoggedInPending

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  if (!isLoggedIn) {
    return <WatchlistsAnon className={styles.anon} />
  }

  return watchlists.length === 0 ? (
    <WatchlistsEmptySection watchlists={watchlists} />
  ) : (
    <>
      <WatchlistList watchlists={watchlists} activeLink={activeLink} />
      <CreateWatchlistBtn watchlists={watchlists} />
    </>
  )
}

const WatchlistList = ({ watchlists, activeLink }) => (
  <div
    className={styles.wrapper}
    style={{
      minHeight: watchlists.length > 3 ? '100px' : `${32 * watchlists.length}px`
    }}
  >
    <div className={styles.list}>
      {watchlists.map(({ name, id, isPublic }) => {
        const link = getWatchlistLink({ id, name })
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

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(NavbarAssetsDropdownWatchlist)

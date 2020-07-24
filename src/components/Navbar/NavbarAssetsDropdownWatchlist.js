import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import WatchlistsAnon from '../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import NewBtn from '../../ducks/Watchlists/Actions/New/NewBtn'
import NewWatchlist from '../../ducks/Watchlists/Actions/New'
import { getWatchlistLink } from '../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../VisibilityIndicator'
import { useUserWatchlists } from '../../ducks/Watchlists/gql/hooks'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../pages/UserSelectors'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

const NavbarAssetsDropdownWatchlist = ({
  activeLink,
  isLoggedIn,
  isLoggedInPending
}) => {
  const [watchlists, loading] = useUserWatchlists()
  const isLoading = loading || isLoggedInPending

  return isLoading ? (
    <Loader className={styles.loader} />
  ) : isLoggedIn ? (
    <>
      {watchlists.length === 0 ? (
        <EmptySection watchlists={watchlists} />
      ) : (
        <>
          <WatchlistList watchlists={watchlists} activeLink={activeLink} />,
          <NewWatchlist
            trigger={<NewBtn border className={styles.watchlistNew} />}
            watchlists={watchlists}
          />
        </>
      )}
    </>
  ) : (
    <WatchlistsAnon />
  )
}

const WatchlistList = ({ watchlists, activeLink }) => (
  <div className={styles.wrapper}>
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

const EmptySection = ({ watchlists }) => (
  <div className={styles.emptyWrapper}>
    <span>
      <NewWatchlist
        trigger={
          <Button accent='positive' className={styles.createBtn}>
            Create
          </Button>
        }
        watchlists={watchlists}
      />
      your own watchlist to track
    </span>
    <span>assets you are interested in</span>
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(NavbarAssetsDropdownWatchlist)

import React from 'react'
import PropTypes from 'prop-types'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly } from './../../components/Responsive'
import Row from './../../components/Row'
import styles from './Watchlist.module.scss'

const MyWatchlist = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <DesktopOnly>
        <h4>My watchlists</h4>
      </DesktopOnly>
      <Row>
        <GetWatchlists
          render={({ isWatchlistsLoading, watchlists }) =>
            watchlists
              .filter(({ listItems }) => Boolean(listItems.length))
              .map(watchlist => (
                <WatchlistCard
                  key={watchlist.id}
                  name={watchlist.name}
                  to={getWatchlistLink(watchlist)}
                  isPublic={watchlist.isPublic}
                  slugs={watchlist.listItems.map(({ project }) => project.slug)}
                />
              ))
          }
        />
      </Row>
    </div>
  )
}

MyWatchlist.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default MyWatchlist

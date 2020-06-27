import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import WatchlistCard from './WatchlistCard'
import FeaturedWatchlists, { getSharedWatchlistLink } from './FeaturedWatchlist'
import NewWatchlistCard from './NewWatchlistCard'
import styles from './WatchlistCards.module.scss'

const WatchlistCards = ({
  watchlists = [],
  showNew = false,
  makeSharedLinks = false,
  classes = {},
  showFeatured = false
}) => (
  <div className={cx(styles.wrapper, classes.watchlists)}>
    {showFeatured && <FeaturedWatchlists />}
    {watchlists.map(watchlist => {
      const { name, ...rest } = watchlist
      return (
        <WatchlistCard
          key={name}
          name={name}
          watchlist={watchlist}
          className={classes.watchlist}
          to={makeSharedLinks ? getSharedWatchlistLink(watchlist) : undefined}
          {...rest}
        />
      )
    })}
    {showNew && <NewWatchlistCard />}
  </div>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired
}

export default WatchlistCards

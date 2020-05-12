import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import WatchlistCard from './WatchlistCard'
import { getSharedWatchlistLink } from './FeaturedWatchlist'
import styles from './WatchlistCards.module.scss'

const WatchlistCards = ({
  watchlists = [],
  makeSharedLinks = false,
  classes = {}
}) => (
  <div className={cx(styles.wrapper, classes.watchlists)}>
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
  </div>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired
}

export default WatchlistCards

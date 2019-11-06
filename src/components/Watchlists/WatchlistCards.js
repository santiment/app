import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import WatchlistCard from './WatchlistCard'
import styles from './WatchlistCards.module.scss'

const WatchlistCards = ({ watchlists = [], classes = {} }) => (
  <div className={cx(styles.wrapper, classes.watchlists)}>
    {watchlists.map(({ name, ...rest }) => (
      <WatchlistCard
        key={name}
        name={name}
        className={classes.watchlist}
        {...rest}
      />
    ))}
  </div>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired
}

export default WatchlistCards

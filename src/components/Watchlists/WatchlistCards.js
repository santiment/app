import React from 'react'
import PropTypes from 'prop-types'
import WatchlistCard from './WatchlistCard'
import styles from './WatchlistCards.module.scss'

const WatchlistCards = ({ watchlists = [] }) => (
  <div className={styles.wrapper}>
    {watchlists.map(({ name, ...rest }) => (
      <WatchlistCard key={name} name={name} {...rest} />
    ))}
  </div>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired
}

export default WatchlistCards

import React from 'react'
import PropTypes from 'prop-types'
import WatchlistCard from './WatchlistCard'
import styles from './WatchlistCards.module.scss'

const WatchlistCards = ({ watchlists = [], slugs = {} }) => (
  <div className={styles.wrapper}>
    {watchlists.map(({ name, assetType, ...rest }) => (
      <WatchlistCard
        key={name}
        name={name}
        slugs={slugs[assetType] || []}
        {...rest}
      />
    ))}
  </div>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired,
  slugs: PropTypes.object.isRequired
}

export default WatchlistCards

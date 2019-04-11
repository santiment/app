import React from 'react'
import PropTypes from 'prop-types'
import WatchlistCard from './WatchlistCard'
import Row from '../Row'

const WatchlistCards = ({ watchlists = [], slugs = {} }) => (
  <Row>
    {watchlists.map(({ name, assetType, ...rest }) => (
      <WatchlistCard
        key={name}
        name={name}
        slugs={slugs[assetType] || []}
        {...rest}
      />
    ))}
  </Row>
)

WatchlistCards.propTypes = {
  watchlists: PropTypes.array.isRequired,
  slugs: PropTypes.object.isRequired
}

export default WatchlistCards

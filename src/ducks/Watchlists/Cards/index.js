import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Card from './WatchlistCard'
import Featured from './Featured'
import { getSharedWatchlistLink } from '..//utils'
import NewCard from './NewCard'
import styles from './index.module.scss'

const Cards = ({
  watchlists = [],
  showNew = false,
  makeSharedLinks = false,
  classes = {},
  showFeatured = false
}) => (
  <div className={cx(styles.wrapper, classes.watchlists)}>
    {watchlists.map(watchlist => {
      const { name, ...rest } = watchlist
      return (
        <Card
          key={name}
          name={name}
          watchlist={watchlist}
          className={classes.watchlist}
          to={makeSharedLinks ? getSharedWatchlistLink(watchlist) : undefined}
          {...rest}
        />
      )
    })}
    {showFeatured && <Featured />}
    {showNew && <NewCard />}
  </div>
)

Cards.propTypes = {
  watchlists: PropTypes.array.isRequired
}

export default Cards

import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Card from './Card'
import Featured from './Featured'
import NewCard from './NewCard'
import styles from './index.module.scss'

const Cards = ({
  watchlists = [],
  showNew = false,
  classes = {},
  showFeatured = false
}) => (
  <div className={cx(styles.wrapper, classes.watchlists)}>
    {watchlists.map(watchlist => {
      return (
        <Card
          key={watchlist.name}
          watchlist={watchlist}
          className={classes.watchlist}
          path='/watchlist/projects/'
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

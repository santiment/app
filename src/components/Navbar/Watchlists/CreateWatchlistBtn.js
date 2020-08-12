import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import styles from './WatchlistsEmptySection.module.scss'

const CreateWatchlistBtn = ({ className, watchlists }) => (
  <NewWatchlist
    trigger={
      <Button border className={cx(styles.createBtn, className)}>
        Create watchlist
      </Button>
    }
    watchlists={watchlists}
  />
)

export default CreateWatchlistBtn

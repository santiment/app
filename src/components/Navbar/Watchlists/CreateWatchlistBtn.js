import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import { PROJECT } from '../../../ducks/Watchlists/detector'
import styles from './EmptySection.module.scss'

const CreateWatchlistBtn = ({ className }) => (
  <NewWatchlist
    type={PROJECT}
    trigger={
      <Button border className={cx(styles.createBtn, className)}>
        Create watchlist
      </Button>
    }
  />
)

export default CreateWatchlistBtn

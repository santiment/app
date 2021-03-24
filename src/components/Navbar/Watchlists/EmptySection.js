import React from 'react'
import Button from '@santiment-network/ui/Button'
import { SvgNew } from '../../Illustrations/NewCard'
import CreateWatchlistBtn from './CreateWatchlistBtn'
import { PROJECT } from '../../../ducks/Watchlists/detector'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import styles from './EmptySection.module.scss'

const WatchlistsEmptySection = () => (
  <div className={styles.wrapper}>
    <SvgNew />

    <span className={styles.description}>
      <NewWatchlist
        type={PROJECT}
        trigger={
          <Button accent='positive' className={styles.btnInText}>
            Create
          </Button>
        }
      />{' '}
      your own watchlist{' '}
    </span>
    <span>to track assets you are </span>
    <span>interested in</span>

    <CreateWatchlistBtn className={styles.first} />
  </div>
)

export default WatchlistsEmptySection

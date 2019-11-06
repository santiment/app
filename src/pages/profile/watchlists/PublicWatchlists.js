import React from 'react'
import WatchlistCards from '../../../components/Watchlists/WatchlistCards'
import styles from './../ProfilePage.module.scss'
import Counter from '../counter/Counter'

const PublicWatchlists = ({ data: watchlists }) => {
  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>
        Public watchlists <Counter value={watchlists.length} />
      </div>
      <WatchlistCards watchlists={watchlists} classes={styles} />
    </div>
  )
}

export default PublicWatchlists

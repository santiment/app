import React from 'react'
import styles from './../ProfilePage.module.scss'
import WatchlistCards from '../../../components/Watchlists/WatchlistCards'

const PublicWatchlists = ({ data: watchlists }) => {
  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>
        Public watchlists ({watchlists.length})
      </div>
      <div>
        <WatchlistCards watchlists={watchlists} />
      </div>
    </div>
  )
}

export default PublicWatchlists

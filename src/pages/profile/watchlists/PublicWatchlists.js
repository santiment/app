import React from 'react'
import WatchlistCards from '../../../ducks/Watchlists/Cards/index'
import styles from './../ProfilePage.module.scss'

const PublicWatchlists = ({ data: watchlists }) => {
  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <WatchlistCards watchlists={watchlists} classes={styles} />
    </div>
  )
}

export default PublicWatchlists

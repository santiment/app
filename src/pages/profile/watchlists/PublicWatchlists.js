import React from 'react'
import cx from 'classnames'
import { WatchlistCards } from '../../../ducks/Watchlists/Cards/Card'
import styles from './../ProfilePage.module.scss'

const PublicWatchlists = ({ watchlists, ...props }) => {
  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={cx(styles.block, styles.block__lists)}>
      <WatchlistCards watchlists={watchlists} {...props} />
    </div>
  )
}

export default PublicWatchlists

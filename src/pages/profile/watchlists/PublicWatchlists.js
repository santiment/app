import React from 'react'
import { BlocksLoader } from './../ProfilePage'
import styles from './../ProfilePage.module.scss'

const PublicWatchlists = ({ data: { watchlists = [], loading } = {} } = {}) => {
  if (loading) {
    return <BlocksLoader />
  }

  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public watchlists ()</div>
      <div />
    </div>
  )
}

export default PublicWatchlists

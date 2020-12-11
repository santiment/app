import React, { useState, useMemo } from 'react'
import Assets from './Assets'
import Watchlists from './Watchlists'
import Section from '../Section'
import Table from '../Table'
import {
  getRecentAssets,
  getRecentWatchlists,
  getRecentScreeners
} from '../../../../utils/recent'
import styles from '../index.module.scss'

const Recents = () => {
  const [assets, watchlists, screeners] = useMemo(
    () => [getRecentAssets(), getRecentWatchlists(), getRecentScreeners()],
    []
  )

  if (assets.length + watchlists.length + screeners.length === 0) {
    return null
  }

  return (
    <Section title='Recents'>
      {!!assets.length && <Assets slugs={assets} />}
      {!!watchlists.length && <Watchlists ids={watchlists} />}

      {false && !!screeners.length && (
        <Table
          className={styles.table}
          title='Screeners'
          rightHeader='Market Cap'
        />
      )}
    </Section>
  )
}

export default Recents

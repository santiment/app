import React from 'react'
import { Redirect } from 'react-router-dom'
import { Section } from '../Watchlists/New'
import Page from '../../ducks/Page'
import StoriesList from '../../components/Stories/StoriesList'
import Trends from '../../components/Trends/Trends'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Featured'
import styles from '../Watchlists/New.module.scss'

const Assets = ({ isDesktop }) => {
  if (isDesktop) {
    return <Redirect to='/watchlists' />
  }

  return (
    <Page title='Explore assets' className={styles.wrapper}>
      <StoriesList classes={styles} />

      <RecentlyWatched className={styles.recents} type='assets' />

      <Section title='Indices'>
        <FeaturedWatchlistCards className={styles.card} />
      </Section>

      <Trends className={styles.trends} />
    </Page>
  )
}

export default Assets

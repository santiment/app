import React from 'react'
import { Redirect } from 'react-router-dom'
import Section from '../Watchlists/Section'
import Page from '../../ducks/Page'
import Trends from '../../components/Trends/Trends'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured'
import styles from '../Watchlists/index.module.scss'

const Assets = ({ isDesktop }) => {
  if (isDesktop) {
    return <Redirect to='/watchlists' />
  }

  return (
    <Page
      title='Markets overview'
      className={styles.wrapper}
      headerClassName={styles.fixedheader}
      mainClassName={styles.margintop}
    >
      <RecentlyWatched type='assets' />

      <Section title='Indices'>
        <FeaturedWatchlistCards className={styles.card} />
      </Section>

      <Section title='Social Trends' externalLink='/labs/trends/explore/'>
        <Trends className={styles.trends} isWithColumnTitles={false} />
      </Section>
    </Page>
  )
}

export default Assets

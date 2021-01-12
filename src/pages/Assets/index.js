import React from 'react'
import { Redirect } from 'react-router-dom'
import Page from '../../ducks/Page'
import StoriesList from '../../components/Stories/StoriesList'
import { Section, FeaturedWatchlistCards } from '../Watchlists/New'
import styles from '../Watchlists/New.module.scss'

const Assets = ({ isDesktop }) => {
  if (isDesktop) {
    return <Redirect to='/watchlists' />
  }

  return (
    <Page title='Explore assets' className={styles.wrapper}>
      <StoriesList classes={styles} />

      <Section title='Indices'>
        <FeaturedWatchlistCards className={styles.card} />
      </Section>
    </Page>
  )
}

export default Assets

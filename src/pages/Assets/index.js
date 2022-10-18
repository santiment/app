import React from 'react'
import { Redirect } from 'react-router-dom'
import Section from '../Watchlists/Section'
import Page from '../../ducks/Page'
import Trends from '../../components/Trends/Trends'
import NftInfluencersTrxTable from '../NftInfluencersTrx/Table/Table'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured'
import styles from '../Watchlists/index.module.scss'

const Assets = ({ isDesktop }) => {
  if (isDesktop) {
    return <Redirect to='/watchlists' />
  }

  return (
    <Page title='Markets overview' className={styles.wrapper}>
      <RecentlyWatched type='assets' />

      <Section title='Indices'>
        <FeaturedWatchlistCards className={styles.card} />
      </Section>

      <Section title='Social Trends' externalLink='/labs/trends/explore/'>
        <Trends className={styles.trends} isWithColumnTitles={false} />
      </Section>

      <Section title='Latest NFT Trx' externalLink='/nft'>
        <NftInfluencersTrxTable isMarket />
      </Section>
    </Page>
  )
}

export default Assets

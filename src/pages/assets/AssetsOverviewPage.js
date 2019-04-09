import React from 'react'
import { graphql } from 'react-apollo'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { allSlugsForAssetTypesGQL } from './../Projects/allProjectsGQL'
import styles from './AssetsOverview.module.scss'

const categories = [
  {
    name: 'All assets',
    assetType: 'all'
  },
  {
    name: 'ERC20',
    assetType: 'erc20'
  },
  {
    name: 'Top 50 ERC20',
    assetType: 'top50Erc20'
  },
  {
    name: 'Stablecoins'
  },
  {
    name: 'US-based projects'
  },
  {
    name: 'Decentralized exchanges'
  },
  {
    name: 'Centralized exchanged'
  }
]

const AssetsOverview = props => (
  <div className='page'>
    <h1>Assets overview</h1>
    <h4>Categories</h4>
    <div className={styles.flexRow}>
      {categories.map(({ name, assetType }) => (
        <WatchlistCard
          key={name}
          name={name}
          price={32}
          change={-1.22}
          slugs={props.slugs[assetType] || []}
        />
      ))}
    </div>
    <h4>My watchlists</h4>
    <div className={styles.flexRow}>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists }) =>
          watchlists
            .filter(({ listItems }) => Boolean(listItems.length))
            .map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
                price={32}
                change={1.22}
                name={watchlist.name}
                isPublic={watchlist.isPublic}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))
        }
      />
    </div>
  </div>
)

const enhance = graphql(allSlugsForAssetTypesGQL, {
  props: ({ data }) => ({
    isLoading: data.loading,
    slugs: {
      all: data.loading ? [] : data.allProjects.map(({ slug }) => slug),
      erc20: data.loading ? [] : data.erc20Projects.map(({ slug }) => slug),
      top50Erc20: data.loading
        ? []
        : data.top50Erc20Projects.map(({ slug }) => slug)
    }
  })
})

export default enhance(AssetsOverview)

import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'
import FeaturedWatchlist from '../../components/Watchlists/FeaturedWatchlist'
import { publicWatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { allSlugsForAssetTypesGQL } from './../Projects/allProjectsGQL'
import { mapItemsToKeys } from '../../utils/utils'
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
  }
]

const publicWatchlists = [
  {
    name: 'Stablecoins',
    assetType: 'stablecoins',
    id: '86'
  },
  {
    name: 'US-Based Projects',
    assetType: 'usa',
    id: '138'
  },
  {
    name: 'Decentralized Exchanges',
    assetType: 'dex',
    id: '127'
  },
  {
    name: 'Centralized Exchanges',
    assetType: 'centralized exchanges',
    id: '272'
  }
]

const AssetsOverview = props => (
  <div className='page'>
    <h1>Assets overview</h1>
    <h4>Categories</h4>
    <div className={styles.flexRow}>
      {[...categories, ...publicWatchlists].map(({ name, assetType }) => (
        <WatchlistCard
          key={name}
          name={name}
          change={-1.22}
          slugs={props.slugs[assetType] || []}
        />
      ))}
    </div>
    <FeaturedWatchlist />
    <h4>My watchlists</h4>
    <div className={styles.flexRow}>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists }) =>
          watchlists
            .filter(({ listItems }) => Boolean(listItems.length))
            .map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
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

const enhance = compose(
  graphql(allSlugsForAssetTypesGQL, {
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
  }),
  graphql(publicWatchlistGQL, {
    props: ({
      data: { fetchAllPublicUserLists = [], loading = true },
      ownProps: { slugs = {} }
    }) => {
      const publicWatchlistMap = mapItemsToKeys(publicWatchlists, {
        keyPath: 'id'
      })

      const publicWatchilstSlugs = fetchAllPublicUserLists
        .filter(({ id }) => publicWatchlistMap[id])
        .reduce(
          (prev, next) => ({
            ...prev,
            [next.name]: next.listItems.map(({ project: { slug } }) => slug)
          }),
          {}
        )

      return {
        slugs: {
          ...slugs,
          ...publicWatchilstSlugs
        },
        isPublicWatchlistsLoading: loading
      }
    }
  })
)

export default enhance(AssetsOverview)

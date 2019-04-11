import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { Tabs } from '@santiment-network/ui'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'
import FeaturedWatchlist from '../../components/Watchlists/FeaturedWatchlist'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import { publicWatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { top50Erc20Projects } from './../Projects/allProjectsGQL'
import { mapItemsToKeys } from '../../utils/utils'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import styles from './AssetsOverview.module.scss'

const basicCategories = [
  {
    name: 'All assets',
    to: '/assets/all',
    slug: 'TOTAL_MARKET',
    assetType: 'all'
  },
  {
    name: 'ERC20',
    to: '/assets/erc20',
    assetType: 'erc20'
  },
  {
    name: 'Top 50 ERC20',
    to: '/assets/list?name=top%2050%20erc20%40227#shared',
    assetType: 'top50Erc20'
  }
]

const publicWatchlists = [
  {
    name: 'Stablecoins',
    assetType: 'stablecoins',
    to: '/assets/list?name=stablecoins@86#shared',
    id: '86'
  },
  {
    name: 'US-Based Projects',
    assetType: 'usa',
    to: '/assets/list?name=usa@138#shared',
    id: '138'
  },
  {
    name: 'Decentralized Exchanges',
    assetType: 'dex',
    to: '/assets/list?name=dex@127#shared',
    id: '127'
  },
  {
    name: 'Centralized Exchanges',
    assetType: 'centralized exchanges',
    to: '/assets/list?name=centralized%20exchanges@272#shared',
    id: '272'
  }
]

const tabs = [
  { content: 'Categories', index: 'categories' },
  { content: 'Featured', index: 'featured' },
  { content: 'My Watchlists', index: 'myWatchlists' }
]

const WatchlistCards = ({ watchlists, slugs }) =>
  watchlists.map(({ name, assetType, ...rest }) => (
    <WatchlistCard
      key={name}
      name={name}
      slugs={slugs[assetType] || []}
      {...rest}
    />
  ))

const AssetsOverview = ({ slugs }) => {
  const [selectedTab, selectTab] = useState(tabs[0].index)
  const onSelectTab = selected => selectTab(selected)

  return (
    <div className='page'>
      <DesktopOnly>
        <h1>Assets overview</h1>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Assets overview' />
        <Tabs
          options={tabs}
          defaultSelectedIndex={selectedTab}
          onSelect={onSelectTab}
          className={styles.tabs}
        />
      </MobileOnly>
      <DesktopOnly>
        <h4>Categories</h4>
        <div className={styles.row}>
          <WatchlistCards
            watchlists={[...basicCategories, ...publicWatchlists]}
            slugs={slugs}
          />
        </div>
        <div className={styles.row}>
          <FeaturedWatchlist />
        </div>
        <div className={styles.row}>
          <MyWatchlist />
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className={styles.row}>
          {selectedTab === 'categories' && (
            <WatchlistCards
              watchlists={[...basicCategories, ...publicWatchlists]}
              slugs={slugs}
            />
          )}
          {selectedTab === 'featured' && <FeaturedWatchlist />}
          {selectedTab === 'myWatchlists' && <MyWatchlist />}
        </div>
      </MobileOnly>
    </div>
  )
}

const enhance = compose(
  graphql(top50Erc20Projects, {
    props: ({ data: { loading = true, top50Erc20Projects = [] } }) => ({
      isLoading: loading,
      slugs: {
        top50Erc20: loading ? [] : top50Erc20Projects.map(({ slug }) => slug)
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

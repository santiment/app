import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from '@santiment-network/ui'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import FeaturedWatchlist from '../../components/Watchlists/FeaturedWatchlist'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import { publicWatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'
import { top50Erc20Projects } from './../Projects/allProjectsGQL'
import { mapItemsToKeys } from '../../utils/utils'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import { checkIsLoggedIn } from './../UserSelectors'
import { PUBLIC_WATCHLISTS, CATEGORIES } from './assets-overview-constants'
import styles from './AssetsOverview.module.scss'

const tabs = [
  { content: 'Categories', index: 'categories' },
  { content: 'Featured', index: 'featured' },
  { content: 'My Watchlists', index: 'myWatchlists' }
]

const AssetsOverview = ({ slugs, isLoggedIn }) => {
  const [selectedTab, selectTab] = useState(tabs[0].index)
  const onSelectTab = selected => selectTab(selected)
  const availableTabs = isLoggedIn ? tabs : tabs.slice(0, -1)

  return (
    <div className='page'>
      <DesktopOnly>
        <h1>Assets overview</h1>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Assets overview' />
        <Tabs
          options={availableTabs}
          defaultSelectedIndex={selectedTab}
          onSelect={onSelectTab}
          className={styles.tabs}
        />
      </MobileOnly>
      <DesktopOnly>
        <h4>Categories</h4>
        <div className={styles.section}>
          <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
        </div>
        <div className={styles.section}>
          <FeaturedWatchlist />
        </div>
        <div className={styles.section}>
          <MyWatchlist isLoggedIn={isLoggedIn} />
        </div>
      </DesktopOnly>
      <MobileOnly>
        {selectedTab === 'categories' && (
          <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
        )}
        {selectedTab === 'featured' && <FeaturedWatchlist />}
        {selectedTab === 'myWatchlists' && (
          <MyWatchlist isLoggedIn={isLoggedIn} />
        )}
      </MobileOnly>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
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
      const publicWatchlistMap = mapItemsToKeys(PUBLIC_WATCHLISTS, {
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
  }),
  connect(mapStateToProps)
)

export default enhance(AssetsOverview)

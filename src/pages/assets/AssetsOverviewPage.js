import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Tabs } from '@santiment-network/ui'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import {
  projectsByFunctionShortGQL,
  publicWatchlistGQL
} from '../../queries/WatchlistGQL'
import { mapItemsToKeys } from '../../utils/utils'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import PageLoader from '../../components/Loader/PageLoader'
import { checkIsLoggedIn } from './../UserSelectors'
import {
  CATEGORIES,
  PUBLIC_WATCHLISTS,
  WATCHLISTS_BY_FUNCTION
} from './assets-overview-constants'
import styles from './AssetsOverview.module.scss'
import RecentlyWatched from './RecentlyWatched'

const tabs = [
  { content: 'Categories', index: 'categories' },
  { content: 'My Watchlists', index: 'myWatchlists' }
]

const AssetsOverview = ({ slugs, isLoggedIn, isPublicWatchlistsLoading }) => {
  const [selectedTab, selectTab] = useState(tabs[0].index)
  const onSelectTab = selected => selectTab(selected)

  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <DesktopOnly>
        <h1>Assets overview</h1>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Assets overview' />
      </MobileOnly>
      <DesktopOnly>
        <h4 className={styles.heading}>Categories</h4>
        <div className={styles.section}>
          <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
        </div>
        <div className={styles.section}>
          <MyWatchlist isLoggedIn={isLoggedIn} />
        </div>
      </DesktopOnly>
      <MobileOnly>
        {isPublicWatchlistsLoading ? (
          <PageLoader />
        ) : (
          <>
            <RecentlyWatched />
            <h2 className={styles.subtitle}>Categories</h2>
            <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
            <h2 className={styles.subtitle}>My Watchlists</h2>
            <MyWatchlist isLoggedIn={isLoggedIn} />
          </>
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

const getProjectsByFunction = () =>
  WATCHLISTS_BY_FUNCTION.map(({ assetType, byFunction }) =>
    graphql(projectsByFunctionShortGQL, {
      options: () => ({ variables: { function: byFunction } }),
      props: ({
        data: { loading = true, allProjectsByFunction = [] },
        ownProps: { slugs = {}, isLoading }
      }) => ({
        isLoading: loading || isLoading,
        slugs: {
          ...slugs,
          [assetType]: loading
            ? []
            : allProjectsByFunction.map(({ slug }) => slug)
        }
      })
    })
  )

const enhance = compose(
  ...getProjectsByFunction(),
  graphql(publicWatchlistGQL, {
    props: ({
      data: { fetchAllPublicUserLists = [], loading = true },
      ownProps: { slugs = {}, isLoading }
    }) => {
      const publicWatchlistMap = mapItemsToKeys(PUBLIC_WATCHLISTS, {
        keyPath: 'id'
      })

      const publicWatchilstSlugs = fetchAllPublicUserLists
        .filter(({ id }) => publicWatchlistMap[id])
        .reduce(
          (prev, next) => ({
            ...prev,
            [next.name.toLowerCase()]: next.listItems.map(
              ({ project: { slug } }) => slug
            )
          }),
          {}
        )

      return {
        slugs: {
          ...slugs,
          ...publicWatchilstSlugs
        },
        isPublicWatchlistsLoading: loading || isLoading
      }
    }
  }),
  connect(mapStateToProps)
)

export default enhance(AssetsOverview)

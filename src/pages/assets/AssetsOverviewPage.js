import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import Tabs from '@santiment-network/ui/Tabs'
import { CATEGORIES, WATCHLISTS_BY_FUNCTION } from './assets-overview-constants'
import { PROJECTS_BY_FUNCTION_SHORT_QUERY } from '../../queries/WatchlistGQL'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import PageLoader from '../../components/Loader/PageLoader'
import { checkIsLoggedIn } from './../UserSelectors'
import styles from './AssetsOverview.module.scss'

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
        <Tabs
          options={tabs}
          defaultSelectedIndex={selectedTab}
          onSelect={onSelectTab}
          className={styles.tabs}
        />
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
        {isPublicWatchlistsLoading && <PageLoader />}
        {!isPublicWatchlistsLoading && selectedTab === 'categories' && (
          <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
        )}
        {selectedTab === 'myWatchlists' && (
          <MyWatchlist isLoggedIn={isLoggedIn} />
        )}
      </MobileOnly>
    </div>
  )
}

const mapStateToProps = state => ({ isLoggedIn: checkIsLoggedIn(state) })

const getProjectsByFunction = () =>
  WATCHLISTS_BY_FUNCTION.map(({ assetType, byFunction }) =>
    graphql(PROJECTS_BY_FUNCTION_SHORT_QUERY, {
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
  connect(mapStateToProps)
)

export default enhance(AssetsOverview)

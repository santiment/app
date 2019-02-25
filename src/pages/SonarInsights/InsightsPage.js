import React, { Fragment } from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Tabs, Button, Icon } from '@santiment-network/ui'
import Loadable from 'react-loadable'
import PageLoader from '../../components/PageLoader'
import styles from './InsightsPage.module.scss'

export const baseLocation = '/insights-sonar'

const LoadableInsightsFeedPage = Loadable({
  loader: () => import('./InsightsFeedPage'),
  loading: () => <PageLoader />
})

const LoadableInsightsCreationPage = Loadable({
  loader: () => import('./InsightsEditor'),
  loading: () => <PageLoader />
})

const LoadableInsightPage = Loadable({
  loader: () => import('./InsightPage'),
  loading: () => <PageLoader />
})

const tabs = [
  {
    index: `${baseLocation}`,
    content: 'All insights'
  },
  {
    index: `${baseLocation}/my`,
    content: 'My insights'
  },
  {
    index: `${baseLocation}/my/drafts`,
    content: 'My drafts '
  }
]

const feedRoutes = [
  baseLocation,
  `${baseLocation}/my`,
  `${baseLocation}/my/drafts`,
  `${baseLocation}/tags/:tag`,
  `${baseLocation}/users/:userId`
]

const InsightsPage = ({
  location: { pathname },
  match: { path, ...matchRest },
  ...props
}) => {
  console.log(path, matchRest, props)
  return (
    <div style={{ width: '100%' }} className='page'>
      <div className={styles.header}>
        <h1>Insights</h1>
        {/* <HelpTrendsAbout /> */}
        <div>
          <Button className={styles.newSignal}>
            <Icon type='plus-round' className={styles.newSignal__icon} />
            New insight
          </Button>
        </div>
      </div>
      <Tabs
        options={tabs}
        defaultSelectedIndex={
          pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
        }
        passSelectionIndexToItem
        className={styles.tabs}
        as={({ selectionIndex, ...props }) => (
          <Link {...props} to={selectionIndex} />
        )}
      />
      <Switch>
        {feedRoutes.map((path, index) => (
          <Route
            exact
            key={index}
            path={path}
            component={LoadableInsightsFeedPage}
          />
        ))}
        <Route
          exact
          path={`${baseLocation}/:id`}
          component={LoadableInsightPage}
        />
        <Route
          exact
          path={`${baseLocation}/new`}
          component={LoadableInsightsCreationPage}
        />
      </Switch>
    </div>
  )
}

export default InsightsPage

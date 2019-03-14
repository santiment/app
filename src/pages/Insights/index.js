import React from 'react'
import cx from 'classnames'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import PageLoader from '../../components/PageLoader'
import styles from './index.module.scss'

export const baseLocation = '/insights'

const LoadableInsightsPage = Loadable({
  loader: () => import('./InsightsPage'),
  loading: () => <PageLoader />
})

const LoadableInsightCreationPage = Loadable({
  loader: () => import('./InsightCreationPage'),
  loading: () => <PageLoader />
})

const LoadableInsightPage = Loadable({
  loader: () => import('./InsightPage'),
  loading: () => <PageLoader />
})

const PageHub = ({ location: { pathname }, isLoggedIn }) => {
  window.scrollTo(0, 0)

  return (
    <div style={{ width: '100%' }} className={cx('page', styles.wrapper)}>
      <Helmet>
        <title>Insights</title>
      </Helmet>
      <Switch>
        <Route
          exact
          path={`${baseLocation}/read/:id`}
          component={LoadableInsightPage}
        />
        <Route
          exact
          path={`${baseLocation}/edit/:id`}
          component={LoadableInsightPage}
        />
        <Route
          exact
          path={`${baseLocation}/new`}
          component={LoadableInsightCreationPage}
        />
        <Route path={`${baseLocation}`} component={LoadableInsightsPage} />
      </Switch>
    </div>
  )
}

export default PageHub

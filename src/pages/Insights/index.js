import React from 'react'
import cx from 'classnames'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import PageLoader from '../../components/Loader/PageLoader'
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

const LoadableUnAuthPage = Loadable({
  loader: () => import('./InsightUnAuthPage'),
  loading: () => <PageLoader />
})

const PageHub = ({ location: { pathname }, isLoggedIn, isDesktop }) => {
  window.scrollTo(0, 0)
  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  const oldInsightId = normalizedPathname.slice(
    normalizedPathname.lastIndexOf('/') - normalizedPathname.length + 1
  )

  if (
    normalizedPathname === `/insights/${oldInsightId}` &&
    Number.isInteger(+oldInsightId)
  ) {
    return <Redirect to={`/insights/read/${oldInsightId}`} />
  }

  return (
    <div style={{ width: '100%' }} className={cx('page', styles.wrapper)}>
      <Helmet>
        <title>Insights</title>
      </Helmet>
      <Switch>
        {!isLoggedIn &&
          (normalizedPathname !== baseLocation &&
            !normalizedPathname.startsWith('/insights/read/')) && (
          <Route component={LoadableUnAuthPage} />
        )}
        <Route
          exact
          path={`${baseLocation}/read/:id`}
          render={props => (
            <LoadableInsightPage
              {...props}
              isLoggedIn={isLoggedIn}
              isDesktop={isDesktop}
            />
          )}
        />
        <Route
          exact
          path={`${baseLocation}/edit/:id`}
          render={props => (
            <LoadableInsightPage {...props} isDesktop={isDesktop} />
          )}
        />
        <Route
          exact
          path={`${baseLocation}/new`}
          render={props => (
            <LoadableInsightCreationPage {...props} isDesktop={isDesktop} />
          )}
        />
        <Route
          path={`${baseLocation}`}
          render={props => (
            <LoadableInsightsPage {...props} isDesktop={isDesktop} />
          )}
        />
      </Switch>
    </div>
  )
}

export default PageHub

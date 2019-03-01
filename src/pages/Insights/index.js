import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PageLoader from '../../components/PageLoader'

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

const PageHub = ({ location: { pathname }, isLoggedIn }) => {
  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname
  return (
    <div style={{ width: '100%' }} className='page'>
      <Switch>
        {!isLoggedIn && normalizedPathname !== baseLocation && (
          <Route component={LoadableUnAuthPage} />
        )}
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

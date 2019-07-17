import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import PageLoader from '../../components/Loader/PageLoader'
import { showNotification } from './../../actions/rootActions'
import { getTimeIntervalFromToday } from './../../utils/dates'
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

const PageHub = ({
  location: { pathname },
  isLoggedIn,
  isDesktop,
  showUsernameAlert,
  hasUsername
}) => {
  const setLastShowUsernameAlert = () => {
    showUsernameAlert()
    localStorage.setItem('withoutUsernameSince', new Date())
  }

  if (isLoggedIn && !hasUsername) {
    const lastShowDate = Date.parse(
      localStorage.getItem('withoutUsernameSince')
    )
    if (lastShowDate) {
      const { from } = getTimeIntervalFromToday(-7, 'd')
      if (lastShowDate - from < 0) setLastShowUsernameAlert()
    } else setLastShowUsernameAlert()
  }

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

const mapStateToProps = ({ user: { data } }) => ({
  userId: data.id,
  hasUsername: !!data.username
})

const mapDispatchToProps = dispatch => ({
  showUsernameAlert: () => {
    dispatch(
      showNotification({
        variant: 'warning',
        solidFill: true,
        title: 'Please add a username',
        description:
          'We need to know more about you to release additional functionality',
        actions: [
          {
            label: (
              <Link className={styles.usernameLink} to='/account'>
                Add username
              </Link>
            )
          }
        ],
        dismissAfter: 80000
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHub)

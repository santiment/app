import React from 'react'
import {
  Route as BasicRoute,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import Loadable from 'react-loadable'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import nprogress from 'nprogress'
import NotificationStack from './components/NotificationStack'
import Roadmap from './pages/Roadmap'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import EmailLoginVerification from './pages/EmailVerification/EmailLoginVerification'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'
import Navbar from './components/Navbar/Navbar'
import withTracker from './withTracker'
import withIntercom from './withIntercom'
import ErrorBoundary from './ErrorBoundary'
import PageLoader from './components/Loader/PageLoader'
import Footer from './components/Footer'
import GDPRPage from './pages/GDPRPage/GDPRPage'
import AssetsPage from './pages/assets/AssetsPage'
import HistoricalBalancePage from './ducks/HistoricalBalance/page/HistoricalBalancePage'
import { getConsentUrl } from './utils/utils'
import CookiePopup from './components/CookiePopup/CookiePopup'
import LogoutPage from './pages/Logout/Logout'
import { mapSizesToProps } from './utils/withSizes'
import CreateAccountFreeTrial from './pages/Login/CreateAccountFreeTrial'
import styles from './App.module.scss'
import './App.scss'

export const PATHS = {
  FEED: '/feed',
  SOCIAL_TOOl: '/labs/trends/explore/',
  LOGIN: '/login',
  LOGIN_VIA_EMAIL: '/login/email',
  CREATE_ACCOUNT: '/sign-up',
  GDPR: '/gdpr',
  PRO_METRICS: '/pro-sheets-templates',
  INDEX: '/index'
}

const FOOTER_DISABLED_FOR = [
  PATHS.FEED,
  PATHS.PRO_METRICS,
  PATHS.SOCIAL_TOOl,
  PATHS.INDEX
]
const FOOTER_ABSOLUTE_FOR = [
  PATHS.LOGIN,
  PATHS.LOGIN_VIA_EMAIL,
  PATHS.CREATE_ACCOUNT,
  PATHS.GDPR
]

const LoadableProMetricsPage = Loadable({
  loader: () => import('./pages/ProMetrics/ProMetrics'),
  loading: () => <PageLoader />
})

const LoadableMarketingPage = Loadable({
  loader: () => import('./pages/Marketing/MarketingPage'),
  loading: () => <PageLoader />
})

const LoadableLabsPage = Loadable({
  loader: () => import('./pages/Labs'),
  loading: () => <PageLoader />
})

const LoadablePricingPage = Loadable({
  loader: () => import('./pages/Pricing'),
  loading: () => <PageLoader />
})

const LoadableLoginPage = Loadable({
  loader: () => import('./pages/Login'),
  loading: () => <PageLoader />
})

const LoadableAccountPage = Loadable({
  loader: () => import('./pages/Account/AccountPage'),
  loading: () => <PageLoader />
})

const LoadableDetailedPage = Loadable({
  loader: () => import('./pages/Detailed/Detailed'),
  loading: () => <PageLoader />
})

const LoadableMobileDetailedPage = Loadable({
  loader: () => import('./pages/Detailed/mobile/MobileDetailedPage'),
  loading: () => <PageLoader />
})

const LoadableDashboardPage = Loadable({
  loader: () => import('./pages/Dashboard/DashboardPage'),
  loading: () => <PageLoader />
})

const LoadableTrendsLabsPage = Loadable({
  loader: () => import('./pages/Trends/LabsTrendsPage'),
  loading: () => <PageLoader />
})

const LoadableTrendsExplorePage = Loadable({
  loader: () => import('./pages/TrendsExplore'),
  loading: () => <PageLoader />
})

const LoadableSonarFeedPage = Loadable({
  loader: () => import('./pages/SonarFeed/SonarFeedPage'),
  loading: () => <PageLoader />
})

const LoadableAssetsOverviewPage = Loadable({
  loader: () => import('./pages/assets/AssetsOverviewPage'),
  loading: () => <PageLoader />
})

const LoadableWatchlistsMobilePage = Loadable({
  loader: () => import('./pages/assets/WatchlistsMobilePage'),
  loading: () => <PageLoader />
})

const LoadableAssetsMobilePage = Loadable({
  loader: () => import('./pages/assets/AssetsMobilePage'),
  loading: () => <PageLoader />
})

const LoadableSearchMobilePage = Loadable({
  loader: () => import('./pages/SearchMobilePage/SearchMobilePage'),
  loading: () => <PageLoader />
})

const LoadableChartPage = Loadable({
  loader: () => import('./pages/Studio'),
  loading: () => <PageLoader />
})

const LoadableMarketSegmentsPage = Loadable({
  loader: () => import('./pages/MarketSegments'),
  loading: () => <PageLoader />
})

const LoadableProfilePage = Loadable({
  loader: () => import('./pages/profile/ProfilePage'),
  loading: () => <PageLoader />
})

const LoadableUnsubscribePage = Loadable({
  loader: () => import('./pages/Unsubscribe/Unsubscribe'),
  loading: () => <PageLoader />
})

const LoadableFeedPage = Loadable({
  loader: () => import('./pages/feed/Feed'),
  loading: () => <PageLoader />
})

class Route extends React.Component {
  componentWillMount () {
    nprogress.start()
  }

  componentDidMount () {
    nprogress.done()
  }

  render () {
    return <BasicRoute {...this.props} />
  }
}

const ExternalRoutes = [
  {
    to: 'https://insights.santiment.net',
    routes: ['insights']
  },
  {
    to: 'https://sheets.santiment.net',
    routes: ['sheets']
  },
  {
    to: 'https://data.santiment.net',
    routes: ['data', 'dashboards']
  },
  {
    to: 'https://docs.santiment.net',
    routes: ['apidocs', 'apiexamples']
  },
  {
    to: 'https://academy.santiment.net',
    routes: ['docs', 'help']
  },
  {
    to: 'mailto:info@santiment.net',
    routes: ['support']
  },
  {
    to: 'https://academy.santiment.net/',
    routes: ['academy']
  }
]

class ExternalRedirect extends React.Component {
  componentWillMount () {
    window.location = this.props.to
  }

  render () {
    return <section>Redirecting...</section>
  }
}

export const App = ({
  isDesktop,
  isLoggedIn,
  isUserLoading,
  token,
  isOffline,
  hasMetamask,
  isBetaModeEnabled,
  location,
  showFooter,
  location: { pathname }
}) => (
  <div className='App'>
    {isOffline && (
      <div className={styles.offline}>
        It looks like you are offline. Some actions might not work.
      </div>
    )}
    {isDesktop ? (
      <Navbar activeLink={pathname} />
    ) : (
      <MobileNavbar activeLink={pathname} />
    )}
    <ErrorBoundary>
      <Switch>
        {['currencies', 'erc20', 'all', 'list'].map(name => (
          <Route
            exact
            key={name}
            path={`/assets/${name}`}
            render={props => {
              if (isDesktop) {
                return (
                  <AssetsPage
                    type={name}
                    isLoggedIn={isLoggedIn}
                    isBetaModeEnabled={isBetaModeEnabled}
                    preload={() => LoadableDetailedPage.preload()}
                    {...props}
                  />
                )
              }
              return (
                <LoadableAssetsMobilePage
                  type={name}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              )
            }}
          />
        ))}
        <Route exact path='/pricing' component={LoadablePricingPage} />
        <Route
          exact
          path={PATHS.GDPR}
          render={props => <GDPRPage {...props} isDesktop={isDesktop} />}
        />
        <Route
          exact
          path={PATHS.CREATE_ACCOUNT}
          render={props => (
            <CreateAccountFreeTrial {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route exact path='/assets' component={LoadableAssetsOverviewPage} />
        <Route
          exact
          path='/watchlists'
          render={props =>
            isDesktop ? (
              <Redirect from='/watchlists' to='/assets' />
            ) : (
              <LoadableWatchlistsMobilePage {...props} />
            )
          }
        />
        <Route exact path='/unsubscribe' component={LoadableUnsubscribePage} />
        <Route
          path={PATHS.FEED}
          render={props => <LoadableFeedPage {...props} />}
        />
        <Route
          exact
          path='/search'
          render={props => {
            if (isDesktop) {
              return <Redirect to='/dashboard' />
            }
            return <LoadableSearchMobilePage {...props} />
          }}
        />
        <Route exact path='/roadmap' component={Roadmap} />
        <Route
          exact
          path='/labs/buidl-heroes'
          render={props => (
            <LoadableMarketSegmentsPage isLoggedIn={isLoggedIn} {...props} />
          )}
        />
        <Route
          exact
          path='/labs/balance'
          render={props => (
            <HistoricalBalancePage {...props} isDesktop={isDesktop} />
          )}
        />
        <Route
          exact
          path='/projects/:slug'
          render={props =>
            isDesktop ? (
              <LoadableDetailedPage isDesktop={isDesktop} {...props} />
            ) : (
              <LoadableMobileDetailedPage {...props} />
            )
          }
        />
        <Route exact path='/labs/trends' component={LoadableTrendsLabsPage} />
        <Route exact path='/labs' component={LoadableLabsPage} />
        <Redirect from='/trends' to='/labs/trends' />
        <Route
          exact
          path={['/labs/trends/explore/:word', '/labs/trends/explore/']}
          render={props => (
            <LoadableTrendsExplorePage isDesktop={isDesktop} {...props} />
          )}
        />
        <Route
          path='/sonar'
          render={props => (
            <LoadableSonarFeedPage
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/dashboard'
          render={props => (
            <LoadableDashboardPage
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              hasMetamask={hasMetamask}
              {...props}
            />
          )}
        />
        <Route path='/logout' component={LogoutPage} />
        <Route
          exact
          path='/account'
          render={props => (
            <LoadableAccountPage
              {...props}
              isUserLoading={isUserLoading}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
        <Redirect from='/ethereum-spent' to='/projects/ethereum' />
        <Route exact path='/privacy-policy' component={PrivacyPolicyPage} />
        <Route path='/email_login' component={EmailLoginVerification} />
        <Route path='/verify_email' component={EmailLoginVerification} />
        {ExternalRoutes.map(links => {
          return links.routes.map(name => (
            <Route
              key={name}
              path={`/${name}`}
              render={() => <ExternalRedirect to={links.to} />}
            />
          ))
        })}
        <Route
          path='/consent'
          render={props => (
            <ExternalRedirect
              to={`${getConsentUrl()}/consent${props.location.search}`}
            />
          )}
        />{' '}
        <Route
          path={['/profile/:id', '/profile']}
          render={props => (
            <LoadableProfilePage
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              isUserLoading={isUserLoading}
              location={props.location}
              {...props}
            />
          )}
        />
        <Route
          path={PATHS.LOGIN}
          render={props => (
            <LoadableLoginPage
              isLoggedIn={isLoggedIn}
              token={token}
              isDesktop={isDesktop}
              {...props}
            />
          )}
        />
        <Route
          path={PATHS.PRO_METRICS}
          render={props => (
            <LoadableProMetricsPage isLoggedIn={isLoggedIn} {...props} />
          )}
        />
        <Route
          path={PATHS.INDEX}
          render={props => (
            <LoadableMarketingPage isLoggedIn={isLoggedIn} {...props} />
          )}
        />
        {!isDesktop && <Redirect from='/' to='/assets' />}
        <Route
          path='/'
          render={props => (
            <LoadableChartPage
              classes={{ wrapper: styles.chart }}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          )}
        />
      </Switch>
    </ErrorBoundary>
    <NotificationStack />
    <CookiePopup />
    {isDesktop && showFooter && (
      <Footer
        classes={{
          footer:
            isPathnameInPages(pathname, FOOTER_ABSOLUTE_FOR) &&
            styles.footerAbsolute
        }}
      />
    )}
  </div>
)

function isPathnameInPages (pathname, pages) {
  return pages.some(path => !pathname.replace(path, '').includes('/'))
}

const mapStateToProps = (state, { location: { pathname, ...rest } }) => {
  const { ethAccounts = [] } = state.user.data

  return {
    isLoggedIn: state.user.data && !!state.user.data.id,
    isUserLoading: state.user.isLoading,
    token: state.user.token,
    isOffline: !state.rootUi.isOnline,
    isBetaModeEnabled: state.rootUi.isBetaModeEnabled,
    hasMetamask: ethAccounts.length > 0 && ethAccounts[0].address,
    showFooter: !isPathnameInPages(pathname, FOOTER_DISABLED_FOR)
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter
)

export default enhance(App)

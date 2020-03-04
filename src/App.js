import React from 'react'
import {
  Route as BasicRoute,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import { FadeInDown } from 'animate-components'
import Loadable from 'react-loadable'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import nprogress from 'nprogress'
import NotificationStack from './components/NotificationStack'
import Roadmap from './pages/Roadmap'
import Signals from './pages/Signals'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import BuildChallenge from './pages/BuildChallenge'
import EmailLoginVerification from './pages/EmailVerification/EmailLoginVerification'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'
import Navbar from './components/Navbar/Navbar'
import withTracker from './withTracker'
import withIntercom from './withIntercom'
import ErrorBoundary from './ErrorBoundary'
import PageLoader from './components/Loader/PageLoader'
import Status from './pages/Status'
import Footer from './components/Footer'
import GDPRPage from './pages/GDPRPage/GDPRPage'
import AssetsPage from './pages/assets/AssetsPage'
import HistoricalBalancePage from './ducks/HistoricalBalance/page/HistoricalBalancePage'
import WordCloudPage from './components/WordCloud/WordCloudPage'
import { getConsentUrl } from './utils/utils'
import CookiePopup from './components/CookiePopup/CookiePopup'
import LogoutPage from './pages/Logout/Logout'
import { mapSizesToProps } from './utils/withSizes'
import styles from './App.module.scss'
import './App.scss'
import CreateAccountFreeTrial from './pages/Login/CreateAccountFreeTrial'

export const PATHS = {
  FEED: '/feed',
  LOGIN: '/login',
  LOGIN_VIA_EMAIL: '/login/email',
  CREATE_ACCOUNT: '/sign-up',
  GDPR: '/gdpr'
}

const FOOTER_DISABLED_FOR = [
  PATHS.FEED,
  PATHS.LOGIN,
  PATHS.LOGIN_VIA_EMAIL,
  PATHS.CREATE_ACCOUNT,
  PATHS.GDPR
]

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
  loader: () => import('./pages/Trends/TrendsExplorePage'),
  loading: () => <PageLoader />
})

const LoadableSonarFeedPage = Loadable({
  loader: () => import('./pages/SonarFeed/SonarFeedPage'),
  loading: () => <PageLoader />
})

const LoadableGainersAndLosersPage = Loadable({
  loader: () => import('./ducks/GainersAndLosers/GainersLosersPage'),
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
  isFullscreenMobile,
  isOffline,
  hasMetamask,
  isBetaModeEnabled,
  location,
  showFooter
}) => (
  <div className='App'>
    {isOffline && (
      <FadeInDown
        className='offline-status-message'
        duration='1.0s'
        timingFunction='ease-out'
        as='div'
      >
        OFFLINE
      </FadeInDown>
    )}
    {isFullscreenMobile ? (
      undefined
    ) : isDesktop ? (
      <Navbar activeLink={location.pathname} />
    ) : (
      <MobileNavbar activeLink={location.pathname} />
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
          render={props => <CreateAccountFreeTrial {...props} />}
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
        <Route exact path='/signals' component={Signals} />
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
        <Route exact path='/labs/wordcloud' component={WordCloudPage} />
        <Route
          exact
          path='/labs/social-movers'
          component={LoadableGainersAndLosersPage}
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
          path='/labs/trends/explore/:word'
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
        <Route exact path='/status' component={Status} />
        <Redirect from='/ethereum-spent' to='/projects/ethereum' />
        <Route exact path='/build' component={BuildChallenge} />
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
    {isDesktop && showFooter && <Footer />}
  </div>
)

const mapStateToProps = (state, { location: { pathname } }) => {
  const { ethAccounts = [] } = state.user.data

  return {
    isLoggedIn: state.user.data && !!state.user.data.id,
    isUserLoading: state.user.isLoading,
    token: state.user.token,
    isFullscreenMobile: state.detailedPageUi.isFullscreenMobile,
    isOffline: !state.rootUi.isOnline,
    isBetaModeEnabled: state.rootUi.isBetaModeEnabled,
    hasMetamask: ethAccounts.length > 0 && ethAccounts[0].address,
    showFooter: FOOTER_DISABLED_FOR.indexOf(pathname) === -1
  }
}

const enchance = compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter
)

export default enchance(App)

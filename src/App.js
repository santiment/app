import React from 'react'
import {
  Route as BasicRoute,
  Switch,
  Redirect,
  Link,
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
import EmailLoginVerification from './pages/EmailLoginVerification'
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
import SignalFormPage from './ducks/Signals/SignalFormPage'
import HistoricalBalancePage from './ducks/HistoricalBalance/page/HistoricalBalancePage'
import WordCloudPage from './components/WordCloud/WordCloudPage'
import { getConsentUrl } from './utils/utils'
import NewsBanner from './components/Banner/NewsBanner'
import LogoutPage from './pages/Logout/Logout'
import LabsPage from './pages/Labs'
import './App.scss'

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
  loader: () => import('./pages/Detailed/MobileDetailedPage'),
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

const LoadableAssetsMobilePage = Loadable({
  loader: () => import('./pages/assets/AssetsMobilePage'),
  loading: () => <PageLoader />
})

const LoadableSearchMobilePage = Loadable({
  loader: () => import('./pages/SearchMobilePage/SearchMobilePage'),
  loading: () => <PageLoader />
})

const LoadableInsights = Loadable({
  loader: () => import('./pages/Insights/'),
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
  token,
  isFullscreenMobile,
  isOffline,
  hasUsername,
  isBetaModeEnabled,
  location
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
    {isLoggedIn && !hasUsername && (
      <div className='no-username-status-message'>
        <Link to='/account'>
          <i className='exclamation triangle icon' />
          Without a username, some functionality will be restricted. Please,
          click on the notification to proceed to the account settings.{' '}
          <i className='exclamation triangle icon' />
        </Link>
      </div>
    )}
    {isDesktop && <NewsBanner />}
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
              return <LoadableAssetsMobilePage type={name} {...props} />
            }}
          />
        ))}
        <Route exact path='/gdpr' component={GDPRPage} />
        <Route exact path='/assets' component={LoadableAssetsOverviewPage} />
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
        <Route exact path='/labs/balance' component={HistoricalBalancePage} />
        <Route exact path='/labs/wordcloud' component={WordCloudPage} />
        <Route
          exact
          path='/labs/social-movers'
          component={LoadableGainersAndLosersPage}
        />
        <Route
          path='/insights'
          render={props => (
            <LoadableInsights
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/projects/:slug'
          render={props =>
            isDesktop ? (
              <LoadableDetailedPage isDesktop={isDesktop} {...props} />
            ) : (
              <LoadableMobileDetailedPage isDesktop={isDesktop} {...props} />
            )
          }
        />
        <Route exact path='/labs/trends' component={LoadableTrendsLabsPage} />
        <Route exact path='/labs' component={LabsPage} />
        <Redirect from='/trends' to='/labs/trends' />
        <Route
          exact
          path='/labs/trends/explore/:word'
          render={props => (
            <LoadableTrendsExplorePage isDesktop={isDesktop} {...props} />
          )}
        />
        <Route
          path='/sonar/feed'
          render={props => (
            <LoadableSonarFeedPage
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          )}
        />
        <Route exact path='/sonar/master' component={SignalFormPage} />
        <Route
          exact
          path='/dashboard'
          render={props => (
            <LoadableDashboardPage
              isDesktop={isDesktop}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          )}
        />
        <Route path='/logout' component={LogoutPage} />
        <Route
          exact
          path='/account'
          render={props => (
            <LoadableAccountPage {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route exact path='/status' component={Status} />
        <Redirect from='/ethereum-spent' to='/projects/ethereum' />
        <Route exact path='/build' component={BuildChallenge} />
        <Route exact path='/privacy-policy' component={PrivacyPolicyPage} />
        <Route path='/email_login' component={EmailLoginVerification} />
        <Route path='/verify_email' component={EmailLoginVerification} />
        {['data', 'dashboards'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://data.santiment.net'} />
            )}
          />
        ))}
        {['apidocs', 'apiexamples'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://docs.santiment.net'} />
            )}
          />
        ))}
        {['docs', 'help'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://help.santiment.net'} />
            )}
          />
        ))}
        <Route
          exact
          path='/support'
          render={props => (
            <ExternalRedirect to={'mailto:info@santiment.net'} />
          )}
        />
        <Route
          path='/consent'
          render={props => (
            <ExternalRedirect
              to={`${getConsentUrl()}/consent${props.location.search}`}
            />
          )}
        />
        <Route
          path='/login'
          render={props => (
            <LoadableLoginPage
              isLoggedIn={isLoggedIn}
              token={token}
              isDesktop={isDesktop}
              {...props}
            />
          )}
        />
        {isDesktop ? (
          <Redirect from='/' to='/dashboard' />
        ) : (
          <Redirect from='/' to='/assets' />
        )}
      </Switch>
    </ErrorBoundary>
    <NotificationStack />
    {isDesktop && <Footer />}
  </div>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.data && !!state.user.data.id,
    token: state.user.token,
    isFullscreenMobile: state.detailedPageUi.isFullscreenMobile,
    isOffline: !state.rootUi.isOnline,
    isBetaModeEnabled: state.rootUi.isBetaModeEnabled,
    hasUsername: !!state.user.data.username
  }
}

export const mapSizesToProps = ({ width }) => ({
  isDesktop: width > 768,
  isTablet: width <= 992 && width > 768,
  isPhone: width <= 768
})

const enchance = compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter
)

export default enchance(App)

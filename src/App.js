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
import { PATHS } from './paths'
import NotificationStack from './components/NotificationStack'
import UrlModals from './components/Modal/UrlModals'
import Roadmap from './pages/Roadmap'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import EmailLoginVerification from './pages/EmailVerification/EmailLoginVerification'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'
import Navbar from './components/Navbar/Navbar'
import withTracker from './withTracker'
import withIntercom from './withIntercom'
import ErrorBoundary from './components/ErrorContent/ErrorBoundary'
import PageLoader from './components/Loader/PageLoader'
import Footer from './components/Footer'
import GDPRPage from './pages/GDPRPage/GDPRPage'
import WatchlistPage from './pages/Watchlist'
import { getConsentUrl } from './utils/utils'
import CookiePopup from './components/CookiePopup/CookiePopup'
import GdprRedirector from './components/GdprRedirector'
import { SHARE_PATH } from './components/Share/utils'
import LogoutPage from './pages/Logout/Logout'
import { mapSizesToProps } from './utils/withSizes'
import CreateAccountFreeTrial from './pages/Login/CreateAccountFreeTrial'
import { withSavedCommentLookup } from './withSavedCommentLookup'
import Intercom from './components/Intercom/index.js'
import styles from './App.module.scss'
import './App.scss'

const FOOTER_DISABLED_FOR = [
  PATHS.STUDIO,
  PATHS.FEED,
  PATHS.PRO_METRICS,
  PATHS.SOCIAL_TOOl,
  PATHS.INDEX,
  PATHS.STABLECOINS,
  PATHS.SHEETS_TEMPLATES,
  PATHS.LIST,
  PATHS.SCREENER
]
const FOOTER_ABSOLUTE_FOR = [
  PATHS.LOGIN,
  PATHS.LOGIN_VIA_EMAIL,
  PATHS.CREATE_ACCOUNT,
  PATHS.GDPR
]

const LoadablePage = loader =>
  Loadable({
    loader,
    loading: () => <PageLoader />
  })

const LoadableIndexPage = LoadablePage(() => import('./pages/Index'))

const LoadableWatchlistsPage = LoadablePage(() =>
  import('./pages/Watchlists/New')
)

const LoadableWatchlistAddressesPage = LoadablePage(() =>
  import('./pages/WatchlistAddresses')
)

const LoadableProMetricsPage = LoadablePage(() =>
  import('./pages/ProMetrics/ProMetrics')
)

const LoadableHistoricalBalancePage = LoadablePage(() =>
  import('./pages/HistoricalBalance')
)

const LoadableLabsPage = LoadablePage(() => import('./pages/Labs'))

const LoadablePricingPage = LoadablePage(() => import('./pages/Pricing'))

const LoadableLoginPage = LoadablePage(() => import('./pages/Login'))

const LoadableAccountPage = LoadablePage(() =>
  import('./pages/Account/AccountPage')
)

const LoadableDetailedPage = LoadablePage(() =>
  import('./pages/Detailed/Detailed')
)

const LoadableMobileDetailedPage = LoadablePage(() =>
  import('./pages/Detailed/mobile/MobileDetailedPage')
)

const LoadableTrendsLabsPage = LoadablePage(() =>
  import('./pages/Trends/LabsTrendsPage')
)

const LoadableTrendsExplorePage = LoadablePage(() =>
  import('./pages/TrendsExplore')
)

const LoadableSonarFeedPage = LoadablePage(() =>
  import('./pages/SonarFeed/SonarFeedPage')
)

/* const LoadableWatchlistsPage = LoadablePage(() => import('./pages/Watchlists')) */

const LoadableWatchlistsMobilePage = LoadablePage(() =>
  import('./pages/Watchlists/WatchlistsMobilePage')
)

const LoadableAssetsMobilePage = LoadablePage(() =>
  import('./pages/Watchlists/AssetsMobilePage')
)

const LoadableSearchMobilePage = LoadablePage(() =>
  import('./pages/SearchMobilePage/SearchMobilePage')
)

const LoadableChartPage = LoadablePage(() => import('./pages/Studio'))

const LoadableStablecoinsPage = LoadablePage(() =>
  import('./pages/StablecoinsPage/StablecoinsPage')
)

const LoadableUniswapProtocolPage = LoadablePage(() =>
  import('./pages/UniswapProtocolPage/UniswapProtocolPage')
)

const LoadableDexsPage = LoadablePage(() => import('./pages/DexsPage/DexsPage'))

const LoadableBtcLockedPage = LoadablePage(() =>
  import('./pages/BtcLockedPage/BtcLockedPage')
)

const LoadableSheetsTemplatePage = LoadablePage(() =>
  import('./pages/SheetsTemplatePage/SheetsTemplatePage')
)

const LoadableLabelsPage = LoadablePage(() =>
  import('./pages/LabelsPage/LabelsPage')
)

const LoadableProfilePage = LoadablePage(() =>
  import('./pages/profile/ProfilePage')
)

const LoadableUnsubscribePage = LoadablePage(() =>
  import('./pages/Unsubscribe/Unsubscribe')
)

const LoadableFeedPage = LoadablePage(() => import('./pages/feed/Feed'))

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
  showFooter,
  location: { pathname, search }
}) => (
  <div className='App'>
    <ErrorBoundary>
      {isOffline && (
        <div className={styles.offline}>
          It looks like you are offline. Some actions might not work.
        </div>
      )}
      {isDesktop ? (
        <Navbar activeLink={pathname} search={search} />
      ) : (
        <MobileNavbar activeLink={pathname} />
      )}
      <GdprRedirector pathname={pathname} />
      {isDesktop && <UrlModals />}

      <ErrorBoundary>
        <Switch>
          <Route path={SHARE_PATH} component={PageLoader} />
          {['erc20', 'all', 'list', 'screener'].map(name => (
            <Route
              exact
              key={name}
              path={`/assets/${name}`}
              render={props => {
                if (isDesktop) {
                  return (
                    <WatchlistPage
                      type={name}
                      isLoggedIn={isLoggedIn}
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
          /* <Route exact path='/assets' component={LoadableWatchlistsPage} />{' '}
          */
          <Route
            exact
            path='/watchlist/addresses/:nameId'
            component={LoadableWatchlistAddressesPage}
          />
          <Route
            exact
            path='/watchlists'
            render={
              props => <LoadableWatchlistsPage isDesktop={isDesktop} />
              // isDesktop ? (
              //  <Redirect from='/watchlists' to='/assets' />
              // ) : (
              // <LoadableWatchlistsMobilePage {...props} /> )
              //
            }
          />
          <Route
            exact
            path='/unsubscribe'
            component={LoadableUnsubscribePage}
          />
          <Route
            path={PATHS.FEED}
            render={props => <LoadableFeedPage {...props} />}
          />
          <Route
            exact
            path='/search'
            render={props => {
              if (isDesktop) {
                return <Redirect to='/' />
              }
              return <LoadableSearchMobilePage {...props} />
            }}
          />
          <Route exact path='/roadmap' component={Roadmap} />
          <Route
            exact
            path='/labs/balance'
            render={({ history }) => (
              <LoadableHistoricalBalancePage
                history={history}
                isDesktop={isDesktop}
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
                exact
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
          {!isDesktop && <Redirect from={PATHS.STUDIO} to='/assets' />}
          <Route
            path={PATHS.STUDIO}
            render={props => (
              <LoadableChartPage
                classes={{ wrapper: styles.chart }}
                isLoggedIn={isLoggedIn}
                {...props}
              />
            )}
          />
          <Route
            path={PATHS.STABLECOINS}
            render={props => (
              <LoadableStablecoinsPage isDesktop={isDesktop} {...props} />
            )}
          />
          <Route
            path={PATHS.UNISWAP_PROTOCOL}
            render={props => (
              <LoadableUniswapProtocolPage isDesktop={isDesktop} {...props} />
            )}
          />
          <Route
            path={PATHS.DEXS}
            render={props => (
              <LoadableDexsPage isDesktop={isDesktop} {...props} />
            )}
          />
          <Route
            path={PATHS.BTC_LOCKED}
            render={props => <LoadableBtcLockedPage {...props} />}
          />
          <Route
            path={PATHS.SHEETS_TEMPLATES}
            render={props => (
              <LoadableSheetsTemplatePage
                isLoggedIn={isLoggedIn}
                isDesktop={isDesktop}
                {...props}
              />
            )}
          />
          <Route
            path={PATHS.LABELS}
            render={props => <LoadableLabelsPage {...props} />}
          />
          <Route
            path={PATHS.CHARTS}
            render={props => (
              <LoadableChartPage
                classes={{ wrapper: styles.chart }}
                isLoggedIn={isLoggedIn}
                {...props}
              />
            )}
          />
          {!isDesktop && <Redirect from={PATHS.INDEX} to='/assets' />}
          <Route path={PATHS.INDEX} component={LoadableIndexPage} />
        </Switch>

        <Intercom isDesktop={isDesktop} />
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
    </ErrorBoundary>
  </div>
)

function isPathnameInPages (pathname, pages) {
  return pages.some(path => !pathname.replace(path, '').includes('/'))
}

const mapStateToProps = ({ user, rootUi }, { location: { pathname } }) => ({
  isLoggedIn: user.data && !!user.data.id,
  isUserLoading: user.isLoading,
  token: user.token,
  isOffline: !rootUi.isOnline,
  showFooter:
    !isPathnameInPages(pathname, FOOTER_DISABLED_FOR) &&
    !pathname.includes(PATHS.STUDIO) &&
    !pathname.includes(PATHS.LIST)
})

const enhance = compose(
  withSavedCommentLookup,
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter
)

export default enhance(App)

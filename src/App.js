import React, { useState, useEffect } from 'react'
import { Route as BasicRoute, Switch, Redirect, withRouter } from 'react-router-dom'
import cx from 'classnames'
import Loadable from 'react-loadable'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import nprogress from 'nprogress'
import { newGlobalShortcut } from 'webkit/utils/events'
import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte'
import { showMasterSelectorDialog } from 'studio/MasterSelectorDialog'
import { queryAllProjects } from 'studio/api/project'
import { isListPath, PATHS } from './paths'
import NotificationStack from './components/NotificationStack'
import UrlModals from './components/Modal/UrlModals'
import Roadmap from './pages/Roadmap'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import EmailLoginVerification from './pages/EmailVerification/EmailLoginVerification'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'
import Navbar from './components/Navbar'
import withTracker from './withTracker'
import withIntercom from './withIntercom'
import ErrorBoundary from './components/ErrorContent/ErrorBoundary'
import PageLoader from './components/Loader/PageLoader'
import Footer from './components/Footer'
import { GDPRPage, UsernamePage } from './pages/ForceActions'
import { getConsentUrl } from './utils/utils'
import CookiePopup from './components/CookiePopup/CookiePopup'
import ForceActionRedirector from './components/ForceActionRedirector'
import { SHARE_PATH } from './components/Share/utils'
import LogoutPage from './pages/Logout/Logout'
import { mapSizesToProps } from './utils/withSizes'
import CreateAccountFreeTrial from './pages/Login/CreateAccountFreeTrial'
import Intercom from './components/Intercom/index.js'
import LiveWidget from './components/LiveWidget'
import SideNav from './components/SideNav'
import TrialPromptDialog from './components/TrialPromptDialog'
import { useSavedComment } from './hooks/comment'
import styles from './App.module.scss'
import './index.scss'
import './App.scss'

const FOOTER_DISABLED_FOR = [
  PATHS.STUDIO,
  PATHS.ALERTS,
  PATHS.FEED,
  PATHS.PRO_METRICS,
  PATHS.SOCIAL_TOOl,
  // PATHS.INDEX,
  PATHS.EXPLORER,
  PATHS.STABLECOINS,
  PATHS.SHEETS_TEMPLATES,
]
const FOOTER_ABSOLUTE_FOR = [PATHS.LOGIN, PATHS.LOGIN_VIA_EMAIL, PATHS.CREATE_ACCOUNT, PATHS.GDPR]

const LoadablePage = (loader) =>
  Loadable({
    loader,
    loading: () => <PageLoader />,
  })

// const LoadableIndexPage = LoadablePage(() => import('./pages/Dashboards'))

const LoadableIndexPage = LoadablePage(() => import('./pages/Explorer'))

const LoadableAssetsPage = LoadablePage(() => import('./pages/Assets'))

const LoadableWatchlistPage = LoadablePage(() => import('./pages/Watchlist'))

const LoadableWatchlistsPage = LoadablePage(() => import('./pages/Watchlists'))

const LoadableScreenerPage = LoadablePage(() => import('./pages/Screener'))

const LoadableWatchlistProjectsPage = LoadablePage(() => import('./pages/WatchlistProjects'))
const LoadableWatchlistAddressesPage = LoadablePage(() => import('./pages/WatchlistAddresses'))

const LoadableProMetricsPage = LoadablePage(() => import('./pages/ProMetrics/ProMetrics'))

const LoadableHistoricalBalancePage = LoadablePage(() => import('./pages/HistoricalBalance'))

const LoadableLabsPage = LoadablePage(() => import('./pages/Labs'))

const LoadablePricingPage = LoadablePage(() => import('./pages/Pricing'))

const LoadableLoginPage = LoadablePage(() => import('./pages/Login'))

const LoadableAccountPage = LoadablePage(() => import('./pages/Account/AccountPage'))

const LoadableDetailedPage = LoadablePage(() => import('./pages/Detailed/Detailed'))

const LoadableMobileDetailedPage = LoadablePage(() =>
  import('./pages/Detailed/mobile/MobileDetailedPage'),
)

const LoadableTrendsExplorePage = LoadablePage(() => import('./pages/TrendsExplore'))

const LoadableAssetsMobilePage = LoadablePage(() => import('./pages/Watchlists/AssetsMobilePage'))

const LoadableSearchMobilePage = LoadablePage(() =>
  import('./pages/SearchMobilePage/SearchMobilePage'),
)

const LoadableChartPage = LoadablePage(() => import('./pages/Studio'))

const LoadableSheetsTemplatePage = LoadablePage(() =>
  import('./pages/SheetsTemplatePage/SheetsTemplatePage'),
)

const LoadableProfilePage = LoadablePage(() => import('./pages/profile/ProfilePage'))

const LoadableUnsubscribePage = LoadablePage(() => import('./pages/Unsubscribe/Unsubscribe'))

const LoadableFeedPage = LoadablePage(() => import('./pages/feed/Feed'))

const LoadableAlertsPage = LoadablePage(() => import('./pages/Alerts/Alerts'))

const LoadableDashboardsPage = LoadablePage(() => import('./pages/Dashboards/Dashboards'))

class Route extends React.Component {
  componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done()
  }

  render() {
    return <BasicRoute {...this.props} />
  }
}

const ExternalRoutes = [
  {
    to: 'https://insights.santiment.net',
    routes: ['insights'],
  },
  {
    to: 'https://sheets.santiment.net',
    routes: ['sheets'],
  },
  {
    to: 'https://data.santiment.net',
    routes: ['data'],
  },
  {
    to: 'https://docs.santiment.net',
    routes: ['apidocs', 'apiexamples'],
  },
  {
    to: 'https://academy.santiment.net',
    routes: ['docs', 'help'],
  },
  {
    to: 'mailto:info@santiment.net',
    routes: ['support'],
  },
  {
    to: 'https://academy.santiment.net/',
    routes: ['academy'],
  },
]

class ExternalRedirect extends React.Component {
  componentWillMount() {
    window.location = this.props.to
  }

  render() {
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
  location: { pathname, search },
  history,
}) => {
  const [isWatchlistPage, setIsWatchlistPage] = useState(false)

  useSavedComment(isLoggedIn)

  useEffect(() => {
    if (pathname.includes(PATHS.STUDIO) || pathname.includes(PATHS.CHARTS)) {
      return
    }

    const svelte = new Dialogs({ target: document.body })
    return () => svelte.$destroy()
  }, [pathname])

  useEffect(() => {
    if (isListPath(pathname)) {
      if (!isWatchlistPage) {
        setIsWatchlistPage(true)
      }
    } else if (isWatchlistPage) {
      setIsWatchlistPage(false)
    }
  }, [pathname])

  useEffect(() => {
    if (!isDesktop) return

    queryAllProjects()
    return newGlobalShortcut('CMD+K', () => {
      const onSelect = window.location.pathname.startsWith('/charts')
        ? null
        : ({ slug, address }) =>
            window.__onLinkClick(`/charts?${address ? 'address' : 'slug'}=${address || slug}`)

      showMasterSelectorDialog(onSelect)
    })
  }, [isDesktop])

  return (
    <div className={cx('App', isWatchlistPage && isDesktop && 'list-container')}>
      <ErrorBoundary history={history}>
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
        <ForceActionRedirector pathname={pathname} />
        {isDesktop && <UrlModals />}

        <ErrorBoundary history={history}>
          <SideNav isDesktop={isDesktop} pathname={pathname} />
          <TrialPromptDialog />
          <Switch>
            <Route path={SHARE_PATH} component={PageLoader} />
            {['list', 'screener'].map((name) => (
              <Route
                exact
                key={name}
                path={`/assets/${name}`}
                render={(props) => {
                  if (isDesktop) {
                    return (
                      <LoadableWatchlistPage
                        type={name}
                        isLoggedIn={isLoggedIn}
                        preload={() => LoadableDetailedPage.preload()}
                        {...props}
                      />
                    )
                  }
                  return <LoadableAssetsMobilePage type={name} isLoggedIn={isLoggedIn} {...props} />
                }}
              />
            ))}
            <Route exact path='/pricing' component={LoadablePricingPage} />
            <Route
              exact
              path={PATHS.GDPR}
              render={(props) => <GDPRPage {...props} isDesktop={isDesktop} />}
            />
            <Route
              exact
              path={PATHS.USERNAME}
              render={(props) => <UsernamePage {...props} isDesktop={isDesktop} />}
            />
            <Route
              exact
              path={PATHS.CREATE_ACCOUNT}
              render={(props) => <CreateAccountFreeTrial {...props} isLoggedIn={isLoggedIn} />}
            />
            <Route
              exact
              path='/assets'
              render={() => <LoadableAssetsPage isDesktop={isDesktop} />}
            />
            <Route
              exact
              path='/assets/erc20'
              render={() => <Redirect to='/watchlist/projects/erc20-projects-5497' />}
            />
            <Route
              exact
              path='/assets/all'
              render={() => <Redirect to='/watchlist/projects/all-projects-5496' />}
            />
            <Route
              exact
              path='/screener/:nameId'
              render={(props) => (
                <LoadableScreenerPage
                  {...props}
                  isDesktop={isDesktop}
                  isLoggedIn={isLoggedIn}
                  isUserLoading={isUserLoading}
                />
              )}
            />
            <Route
              exact
              path='/watchlist/projects/:nameId'
              render={(props) => <LoadableWatchlistProjectsPage {...props} isDesktop={isDesktop} />}
            />
            <Route
              exact
              path='/watchlist/addresses/:nameId'
              component={LoadableWatchlistAddressesPage}
            />
            <Route
              exact
              path='/watchlists'
              render={() => <LoadableWatchlistsPage isDesktop={isDesktop} />}
            />
            <Route exact path='/unsubscribe' component={LoadableUnsubscribePage} />
            <Route
              path={PATHS.FEED}
              render={(props) => {
                if (isDesktop) {
                  return <Redirect to='/' />
                }
                return <LoadableFeedPage {...props} />
              }}
            />
            <Route
              exact
              path={PATHS.ALERTS}
              render={(props) => <LoadableAlertsPage {...props} />}
            />
            <Route
              path={`${PATHS.ALERTS}/:id`}
              render={(props) => <LoadableAlertsPage {...props} />}
            />
            <Route
              exact
              path='/search'
              render={(props) => {
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
                <LoadableHistoricalBalancePage history={history} isDesktop={isDesktop} />
              )}
            />
            <Route
              exact
              path='/projects/:slug'
              render={(props) =>
                isDesktop ? (
                  <LoadableDetailedPage isDesktop={isDesktop} {...props} />
                ) : (
                  <LoadableMobileDetailedPage {...props} />
                )
              }
            />
            <Route exact path='/labs' component={LoadableLabsPage} />
            <Route
              exact
              path={['/labs/trends/explore/:word', '/labs/trends/explore/']}
              render={(props) => <LoadableTrendsExplorePage isDesktop={isDesktop} {...props} />}
            />
            <Redirect from='/sonar/signal/:id/edit' to={`/alerts/:id/edit/${search}`} />
            <Redirect from='/alert/:id/edit' to={`/alerts/:id/edit/${search}`} />
            <Redirect from='/alert/:id' to={`/alerts/:id`} />
            <Redirect from='/sonar/signal/:id' to={`/alerts/:id/${search}`} />
            <Redirect from='/sonar/my-signals' to={`/alerts${search}`} />
            <Redirect from='/sonar/my-alerts' to={`/alerts${search}`} />
            <Route path='/logout' component={LogoutPage} />
            <Route
              exact
              path='/account'
              render={(props) => (
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
            {ExternalRoutes.map((links) => {
              return links.routes.map((name) => (
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
              render={(props) => (
                <ExternalRedirect to={`${getConsentUrl()}/consent${props.location.search}`} />
              )}
            />{' '}
            <Route
              path={['/profile/:id', '/profile']}
              render={(props) => (
                <LoadableProfilePage isDesktop={isDesktop} location={props.location} {...props} />
              )}
            />
            <Route
              path={PATHS.LOGIN}
              render={(props) => (
                <LoadableLoginPage isLoggedIn={isLoggedIn} token={token} {...props} />
              )}
            />
            <Route
              path={PATHS.PRO_METRICS}
              render={(props) => <LoadableProMetricsPage isLoggedIn={isLoggedIn} {...props} />}
            />
            <Route
              path={PATHS.CHARTS}
              render={(props) => (
                <LoadableChartPage
                  classes={{ wrapper: styles.chart }}
                  isDesktop={isDesktop}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              )}
            />
            <Route
              path={PATHS.STUDIO}
              render={(props) => (
                <LoadableChartPage
                  classes={{ wrapper: styles.chart }}
                  isDesktop={isDesktop}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              )}
            />
            <Route
              path={PATHS.DASHBOARDS}
              render={(props) => <LoadableDashboardsPage {...props} />}
            />
            <Route
              path={PATHS.SHEETS_TEMPLATES}
              render={(props) => (
                <LoadableSheetsTemplatePage
                  isLoggedIn={isLoggedIn}
                  isDesktop={isDesktop}
                  {...props}
                />
              )}
            />
            <Redirect from={PATHS.LABELS} to={PATHS.ETH_ANALYSIS} />
            {!isDesktop && <Redirect from={PATHS.EXPLORER} to='/assets' />}
            <Route path={PATHS.EXPLORER} component={LoadableIndexPage} />
          </Switch>

          {!pathname.includes(PATHS.CHARTS) && <Intercom isDesktop={isDesktop} />}
        </ErrorBoundary>

        <NotificationStack />
        <CookiePopup />
        {isDesktop && <LiveWidget />}

        {isDesktop && showFooter && (
          <Footer
            classes={{
              footer: isPathnameInPages(pathname, FOOTER_ABSOLUTE_FOR) && styles.footerAbsolute,
            }}
          />
        )}
      </ErrorBoundary>
    </div>
  )
}

function isPathnameInPages(pathname, pages) {
  return pages.some((path) => !pathname.replace(path, '').includes('/'))
}

const mapStateToProps = ({ user, rootUi }, { location: { pathname } }) => ({
  isLoggedIn: user.data && !!user.data.id,
  isUserLoading: user.isLoading,
  token: user.token,
  isOffline: !rootUi.isOnline,
  showFooter:
    !isPathnameInPages(pathname, FOOTER_DISABLED_FOR) &&
    !pathname.includes(PATHS.STUDIO) &&
    !pathname.includes(PATHS.CHARTS) &&
    !pathname.includes(PATHS.LIST) &&
    !pathname.includes(PATHS.DASHBOARDS),
})

const enhance = compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter,
)

export default enhance(App)

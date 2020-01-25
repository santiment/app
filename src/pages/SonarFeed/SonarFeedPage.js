import React, { Fragment, useState, useEffect } from 'react'
import { matchPath } from 'react-router'
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import Loadable from 'react-loadable'
import PageLoader from '../../components/Loader/PageLoader'
import UnAuth from '../../components/UnAuth/UnAuth'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { isTelegramConnected } from '../../pages/UserSelectors'
import SonarFeedHeader from './SonarFeedActions/SonarFeedHeader'
import { showNotification } from '../../actions/rootActions'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import {
  SIGNAL_ANCHORS,
  SIGNAL_ROUTES
} from '../../ducks/Signals/common/constants'
import { getShareSignalParams } from '../../ducks/Signals/common/getSignal'
import { sendParams } from '../Account/SettingsSonarWebPushNotifications'
import styles from './SonarFeedPage.module.scss'
import { RecommendedSignals } from './SonarFeedRecommendations'

const baseLocation = '/sonar'

const LoadableMySignals = Loadable({
  loader: () => import('./SonarFeedMySignalsPage'),
  loading: () => <PageLoader />
})

const DEFAULT_ROUTE = {
  index: SIGNAL_ROUTES.MY_SIGNALS,
  content: 'My signals',
  component: LoadableMySignals
}

const MY_SIGNALS_LIST = {
  ...DEFAULT_ROUTE,
  path: SIGNAL_ROUTES.MY_SIGNALS
}

const MY_SIGNALS_MODAL_VIEW = {
  ...DEFAULT_ROUTE,
  path: SIGNAL_ROUTES.SIGNAL,
  hidden: true
}

const tabs = [
  MY_SIGNALS_LIST,
  MY_SIGNALS_MODAL_VIEW,
  {
    index: `${baseLocation}/activity`,
    path: `${baseLocation}/activity`,
    content: 'Activity',
    component: Loadable({
      loader: () => import('./SonarFeedActivityPage'),
      loading: () => <PageLoader />
    })
  }
]

const SonarFeed = ({
  location: { pathname },
  isLoggedIn,
  isDesktop,
  isTelegramConnected,
  isUserLoading,
  showTelegramAlert,
  location: { hash } = {}
}) => {
  if (pathname === baseLocation) {
    return <Redirect to={tabs[0].index} />
  }

  const [triggerId, setTriggerId] = useState(undefined)

  useEffect(
    () => {
      if (!isTelegramConnected && isLoggedIn) {
        showTelegramAlert()
      }
    },
    [isTelegramConnected, isLoggedIn]
  )

  useEffect(() => {
    sendParams()
  })

  useEffect(
    () => {
      const pathParams = matchPath(pathname, SIGNAL_ROUTES.SIGNAL)

      if (triggerId && !pathParams) {
        setTriggerId(undefined)
      } else if (pathParams && pathParams.params) {
        setTriggerId(pathParams.params.id)
      }
    },
    [pathname]
  )

  const shareSignalParams = getShareSignalParams()

  const isActivities = hash === SIGNAL_ANCHORS.ACTIVITIES
  const currentPage = isActivities
    ? SIGNAL_ROUTES.ACTIVITIES
    : SIGNAL_ROUTES.MY_SIGNALS

  const defaultRoute = isActivities ? (
    <Route component={tabs[1].component} />
  ) : (
    <Route component={tabs[0].component} />
  )

  return (
    <div style={{ width: '100%' }} className='page'>
      {isDesktop ? (
        <div className={styles.header}>
          <SonarFeedHeader />
          {!isUserLoading && (
            <SignalMasterModalForm
              previousPage={currentPage}
              triggerId={triggerId}
              shareParams={shareSignalParams}
            />
          )}
        </div>
      ) : (
        <div className={styles.header}>
          <MobileHeader
            title={<SonarFeedHeader />}
            rightActions={
              <div className={styles.addSignal}>
                {!isUserLoading && (
                  <SignalMasterModalForm
                    previousPage={currentPage}
                    triggerId={triggerId}
                    shareParams={shareSignalParams}
                  />
                )}
              </div>
            }
          />
        </div>
      )}

      <Tabs
        options={tabs.filter(({ hidden }) => !hidden)}
        defaultSelectedIndex={pathname}
        passSelectionIndexToItem
        className={styles.tabs}
        as={({ selectionIndex, ...props }) => (
          <Link {...props} to={selectionIndex} />
        )}
      />
      <div className={styles.content}>
        <Switch>
          {isUserLoading && <PageLoader className={styles.loader} />}
          {!isUserLoading && !isLoggedIn ? <AnonymouseInSonar /> : ''}
          {tabs.map(({ index, path, component }) => (
            <Route key={index} path={path} component={component} />
          ))}
          {defaultRoute}
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isUserLoading: state.user && !!state.user.isLoading,
    isTelegramConnected: isTelegramConnected(state)
  }
}

const mapDispatchToProps = dispatch => ({
  showTelegramAlert: () => {
    dispatch(
      showNotification({
        variant: 'error',
        title: `Telegram bot is not connected`,
        description: (
          <Fragment>
            Connect it in&nbsp;
            <Link className={styles.link} to='/account'>
              my account
            </Link>
          </Fragment>
        ),
        dismissAfter: 8000
      })
    )
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SonarFeed)

const AnonymouseInSonar = () => (
  <>
    <UnAuth />
    <div className={styles.recommendedSignals}>
      <RecommendedSignals />
    </div>
  </>
)

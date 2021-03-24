import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { matchPath } from 'react-router'
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import PageLoader from '../../components/Loader/PageLoader'
import UnAuth from '../../components/UnAuth/UnAuth'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import SonarFeedHeader from './SonarFeedActions/SonarFeedHeader'
import { showNotification } from '../../actions/rootActions'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import { ALERT_ROUTES } from '../../ducks/Signals/common/constants'
import {
  getShareSignalParams,
  useSignal
} from '../../ducks/Signals/common/getSignal'
import { sendParams } from '../Account/SettingsSonarWebPushNotifications'
import { RecommendedSignals } from './SonarFeedRecommendations'
import { METRIC_TYPES } from '../../ducks/Signals/utils/constants'
import ScreenerSignalDialog from '../../ducks/Signals/ScreenerSignal/ScreenerSignalDialog'
import { useUserSettings } from '../../stores/user/settings'
import { useUser } from '../../stores/user'
import styles from './SonarFeedPage.module.scss'

const baseLocation = '/sonar'

const LoadableMySignals = Loadable({
  loader: () => import('./SonarFeedMySignalsPage'),
  loading: () => <PageLoader />
})

const DEFAULT_ROUTE = {
  index: ALERT_ROUTES.ALERTS,
  content: 'My alerts',
  component: LoadableMySignals
}

const ALERTS_LIST = {
  ...DEFAULT_ROUTE,
  path: ALERT_ROUTES.ALERTS
}

const ALERTS_MODAL_VIEW = {
  ...DEFAULT_ROUTE,
  path: ALERT_ROUTES.ALERT,
  hidden: true
}
const tabs = [ALERTS_LIST, ALERTS_MODAL_VIEW]

export const SignalModal = ({ id: triggerId, params, ...rest }) => {
  const shareSignalParams = getShareSignalParams(params)

  const isOpen = !!triggerId
  const { data = {}, loading } = useSignal({ triggerId, skip: !isOpen })

  if (loading || !data) {
    return null
  }

  const { trigger: { trigger = {} } = {} } = data
  const { settings: { type } = {} } = trigger

  switch (type) {
    case METRIC_TYPES.SCREENER_SIGNAL: {
      return (
        <ScreenerSignalDialog
          signal={trigger}
          defaultOpen={isOpen}
          goBackTo={ALERT_ROUTES.ALERTS}
        />
      )
    }
    default: {
      return (
        <SignalMasterModalForm
          id={triggerId}
          shareParams={shareSignalParams}
          defaultOpen={isOpen}
          {...rest}
        />
      )
    }
  }
}

const SonarFeed = ({
  location: { pathname },
  isLoggedIn,
  isDesktop,
  showTelegramAlert
}) => {
  const { loading: isUserLoading } = useUser()
  const pathParams = useMemo(
    () => {
      const parsed = matchPath(pathname, ALERT_ROUTES.ALERT)

      return parsed ? parsed.params : undefined
    },
    [pathname]
  )

  const [triggerId, setTriggerId] = useState(
    pathParams ? pathParams.id : undefined
  )

  const {
    settings: { isTelegramAllowAlerts },
    loading: loadingSettings
  } = useUserSettings()

  useEffect(
    () => {
      if (!loadingSettings && !isTelegramAllowAlerts && isLoggedIn) {
        showTelegramAlert()
      }
    },
    [isTelegramAllowAlerts, loadingSettings, isLoggedIn]
  )

  useEffect(() => {
    sendParams()
  }, [])

  useEffect(
    () => {
      if (triggerId && !pathParams) {
        setTriggerId(undefined)
      } else if (pathParams) {
        setTriggerId(pathParams.id)
      }
    },
    [pathParams]
  )

  if (pathname === baseLocation) {
    return <Redirect to={tabs[0].index} />
  }

  const defaultRoute = <Route component={tabs[0].component} />

  return (
    <div style={{ width: '100%' }} className='page'>
      {isDesktop ? (
        <div className={styles.header}>
          <SonarFeedHeader />
          {!isUserLoading && <SignalModal id={triggerId} params={pathParams} />}
        </div>
      ) : (
        <div className={styles.header}>
          <MobileHeader title={<SonarFeedHeader />} />
          <div className={styles.addSignal}>
            {!isUserLoading && (
              <SignalModal id={triggerId} params={pathParams} />
            )}
          </div>
        </div>
      )}

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
  null,
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

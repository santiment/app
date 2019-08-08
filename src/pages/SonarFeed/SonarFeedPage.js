import React, { Fragment, useState, useEffect } from 'react'
import { matchPath } from 'react-router'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import Loadable from 'react-loadable'
import PageLoader from '../../components/Loader/PageLoader'
import InsightUnAuthPage from './../../pages/Insights/InsightUnAuthPage'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { selectIsTelegramConnected } from '../../pages/UserSelectors'
import SonarFeedHeader from './SonarFeedActions/SonarFeedHeader'
import { showNotification } from '../../actions/rootActions'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import { SIGNAL_ROUTES } from '../../ducks/Signals/common/constants'
import { getShareSignalParams } from '../../ducks/Signals/common/getSignal'
import styles from './SonarFeedPage.module.scss'

const baseLocation = '/sonar'
const editTriggerSettingsModalLocation = `${baseLocation}/signal/:id/edit`

const tabs = [
  {
    index: SIGNAL_ROUTES.MY_SIGNALS,
    content: 'My signals',
    component: Loadable({
      loader: () => import('./SonarFeedMySignalsPage'),
      loading: () => <PageLoader />
    })
  },
  {
    index: `${baseLocation}/activity`,
    content: 'Activity',
    component: Loadable({
      loader: () => import('./SonarFeedActivityPage'),
      loading: () => <PageLoader />
    })
  }
  // {
  // index: `${baseLocation}/explore`,
  // content: 'Explore',
  // component: Loadable({
  // loader: () => import('../../components/SignalCard/SignalCardsGrid'),
  // loading: () => <PageLoader />
  // })
  // },
]

const LoadableSignalDetailsPage = Loadable({
  loader: () => import('./SignalDetails'),
  loading: () => <PageLoader />
})

const LoadableEditSignalPage = Loadable({
  loader: () => import('./SonarFeedMySignalsPage'),
  loading: () => <PageLoader />
})

const SonarFeed = ({
  location: { pathname },
  isLoggedIn,
  isDesktop,
  isTelegramConnected,
  isUserLoading,
  showTelegramAlert
}) => {
  if (pathname === baseLocation) {
    return <Redirect exact from={baseLocation} to={tabs[0].index} />
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

  useEffect(
    () => {
      if (triggerId && !matchPath(pathname, editTriggerSettingsModalLocation)) {
        setTriggerId(undefined)
      }
    },
    [pathname]
  )

  const setLoadingSignalId = id => {
    setTriggerId(id)
  }

  const shareSignalParams = getShareSignalParams()

  return (
    <div style={{ width: '100%' }} className='page'>
      {isDesktop ? (
        <div className={styles.header}>
          <SonarFeedHeader />
          <SignalMasterModalForm
            triggerId={triggerId}
            shareParams={shareSignalParams}
          />
        </div>
      ) : (
        <div className={styles.header}>
          <MobileHeader
            title={<SonarFeedHeader />}
            rightActions={
              <div className={styles.addSignal}>
                <SignalMasterModalForm
                  triggerId={triggerId}
                  shareParams={shareSignalParams}
                />
              </div>
            }
          />
        </div>
      )}

      <Tabs
        options={tabs}
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
          {!isUserLoading && !isLoggedIn ? <InsightUnAuthPage /> : ''}
          {tabs.map(({ index, component }) => (
            <Route key={index} path={index} component={component} />
          ))}
          <Route
            path={`${baseLocation}/details/:id`}
            exact
            render={props => <LoadableSignalDetailsPage {...props} />}
          />
          ,
          <Route
            path={editTriggerSettingsModalLocation}
            exact
            render={props => (
              <LoadableEditSignalPage
                setLoadingSignalId={setLoadingSignalId}
                {...props}
              />
            )}
          />
          }
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isUserLoading: state.user && !!state.user.isLoading,
    isTelegramConnected: selectIsTelegramConnected(state)
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

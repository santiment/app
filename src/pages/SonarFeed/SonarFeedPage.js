import React, { Fragment, useState, useEffect } from 'react'
import { matchPath } from 'react-router'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Tabs from '@santiment-network/ui/Tabs'
import Loadable from 'react-loadable'
import PageLoader from '../../components/Loader/PageLoader'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import InsightUnAuthPage from './../../pages/Insights/InsightUnAuthPage'
import styles from './SonarFeedPage.module.scss'

const baseLocation = '/sonar/feed'
const detailsModalLocation = `${baseLocation}/details/:id/edit`

const tabs = [
  {
    index: `${baseLocation}/activity`,
    content: 'Activity',
    component: Loadable({
      loader: () => import('./SonarFeedActivityPage'),
      loading: () => <PageLoader />
    })
  },
  // {
  // index: `${baseLocation}/explore`,
  // content: 'Explore',
  // component: Loadable({
  // loader: () => import('../../components/SignalCard/SignalCardsGrid'),
  // loading: () => <PageLoader />
  // })
  // },
  {
    index: `${baseLocation}/my-signals`,
    content: 'My signals',
    component: Loadable({
      loader: () => import('./SonarFeedMySignalsPage'),
      loading: () => <PageLoader />
    })
  }
]

const LoadableSignalDetailsPage = Loadable({
  loader: () => import('./SignalDetails'),
  loading: () => <PageLoader />
})

const LoadableEditSignalPage = Loadable({
  loader: () => import('./SonarFeedMySignalsPage'),
  loading: () => <PageLoader />
})

const SonarFeed = ({ location: { pathname }, isLoggedIn, match }) => {
  if (pathname === baseLocation) {
    return <Redirect exact from={baseLocation} to={tabs[0].index} />
  }

  const [triggerId, setTriggerId] = useState(undefined)

  const setLoadingSignalId = id => {
    setTriggerId(id)
  }

  useEffect(() => {
    if (triggerId && !matchPath(pathname, detailsModalLocation)) {
      triggerId && setTriggerId(undefined)
    }
  })

  return (
    <div style={{ width: '100%' }} className='page'>
      <div className={styles.header}>
        <h1>Sonar</h1>
        <div>
          {// TODO: Disable search and filter buttons
            false && pathname !== '/sonar/feed/activity' && (
              <Fragment>
                <Icon type='search' className={styles.search} />
                <Icon type='filter' className={styles.filter} />
              </Fragment>
            )}
          <SignalMasterModalForm triggerId={triggerId} />
        </div>
      </div>
      <div className={styles.pages}>
        <Tabs
          options={tabs}
          defaultSelectedIndex={pathname}
          passSelectionIndexToItem
          className={styles.tabs}
          as={({ selectionIndex, ...props }) => (
            <Link {...props} to={selectionIndex} />
          )}
        />
        <Switch>
          {!isLoggedIn ? <InsightUnAuthPage /> : ''}
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
            path={detailsModalLocation}
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

export default SonarFeed

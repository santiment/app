import React, { Fragment } from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Tabs, Icon } from '@santiment-network/ui'
import Loadable from 'react-loadable'
import PageLoader from '../../components/Loader/PageLoader'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import InsightUnAuthPage from './../../pages/Insights/InsightUnAuthPage'
import styles from './SonarFeedPage.module.scss'

const baseLocation = '/sonar/feed'

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

const SonarFeed = ({ location: { pathname }, isLoggedIn }) => {
  if (pathname === baseLocation) {
    return <Redirect exact from={baseLocation} to={tabs[0].index} />
  }

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
          <SignalMasterModalForm />
        </div>
      </div>
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
          component={Loadable({
            loader: () => import('./SignalDetails'),
            loading: () => <PageLoader />
          })}
        />
        <Route
          path={`${baseLocation}/details/:id/edit`}
          component={Loadable({
            loader: () =>
              import('../../ducks/Signals/signalModal/SignalMasterModalForm'),
            render: (loaded, props) => (
              <loaded.default isEdit redirectEnabled {...props} />
            ),
            loading: () => <PageLoader />
          })}
        />
      </Switch>
    </div>
  )
}

export default SonarFeed

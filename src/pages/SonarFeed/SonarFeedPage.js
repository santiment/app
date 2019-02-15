import React from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Tabs, Button, Icon } from '@santiment-network/ui'
import Loadable from 'react-loadable'
import PageLoader from '../../components/PageLoader'
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
  {
    index: `${baseLocation}/explore`,
    content: 'Explore',
    component: Loadable({
      loader: () => import('./SonarFeedExplorePage'),
      loading: () => <PageLoader />
    })
  },
  {
    index: `${baseLocation}/my-signals`,
    content: 'My signals',
    component: Loadable({
      loader: () => import('./SonarFeedActivityPage'),
      loading: () => <PageLoader />
    })
  }
]

const SonarFeed = ({ location: { pathname } }) => {
  if (pathname === baseLocation) {
    return <Redirect exact from={baseLocation} to={tabs[0].index} />
  }

  return (
    <div style={{ width: '100%' }} className='page'>
      <div className={styles.header}>
        <h1>Sonar</h1>
        {/* <HelpTrendsAbout /> */}
        <Button className={styles.newSignal}>
          <Icon type='plus-round' className={styles.newSignal__icon} />
          New signal
        </Button>
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
        {tabs.map(({ index, component }) => (
          <Route key={index} path={index} component={component} />
        ))}
      </Switch>
    </div>
  )
}

export default SonarFeed

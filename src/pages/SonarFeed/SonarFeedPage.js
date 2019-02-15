import React from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Tabs } from '@santiment-network/ui'
import styles from './SonarFeedPage.module.scss'

const baseLocation = '/sonar/feed'

const tabs = [
  { index: `${baseLocation}/activity`, content: 'Activity' },
  {
    index: `${baseLocation}/explore`,
    content: 'Explore'
  },
  {
    index: `${baseLocation}/my-signals`,
    content: 'My signals'
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
        {tabs.map(({ index, content }) => (
          <Route key={index} path={index} render={() => content} />
        ))}
      </Switch>
    </div>
  )
}

export default SonarFeed

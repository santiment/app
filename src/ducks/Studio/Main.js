import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from './Tabs'
import StudioTabsKeyStats from './Tabs/KeyStats'
import TabsWidgets from './Tabs/Widgets'
import StudioInfo from '../SANCharts/Header'
import SanbaseBanner from '../../components/SanbaseBanner/SanbaseBanner'
import styles from './Main.module.scss'

const Main = ({
  widgets,
  topSlot,
  bottomSlot,
  settings,
  setSettings,
  setIsICOPriceDisabled,
  ...props
}) => {
  const { slug } = settings

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings({ ...settings, slug, title, projectId, ticker })
    setIsICOPriceDisabled(true)
  }

  return (
    <>
      <SanbaseBanner />
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <StudioTabs />
      <div className={cx(styles.container, styles.content)}>
        <Switch>
          <Route path='/:base/stats'>
            <StudioTabsKeyStats slug={slug} />
          </Route>
          <Route>
            <TabsWidgets
              {...props}
              settings={settings}
              widgets={widgets}
              setIsICOPriceDisabled={setIsICOPriceDisabled}
              onProjectSelect={onProjectSelect}
            />
          </Route>
        </Switch>
      </div>
      {bottomSlot}
    </>
  )
}

export default Main

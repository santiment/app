import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from './Tabs'
import TabsWidgets from '../Studio/Tabs/Widgets'
import StudioTabsKeyStats from './Tabs/KeyStats'
import StudioInfo from '../SANCharts/Header'
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
          <Route path='/studio/stats'>
            <StudioTabsKeyStats slug={slug} />
          </Route>
          <Route path='/studio'>
            <TabsWidgets
              {...props}
              settings={settings}
              widgets={widgets}
              setIsICOPriceDisabled={setIsICOPriceDisabled}
            />
          </Route>
        </Switch>
      </div>
      {bottomSlot}
    </>
  )
}

export default Main

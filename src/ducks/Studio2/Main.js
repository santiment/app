import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from '../Studio/Tabs'
import TabsWidgets from './Tabs/Widgets'
import StudioTabsKeyStats from '../Studio/Tabs/KeyStats'
import StudioInfo from '../SANCharts/Header'
import styles from '../Studio/index.module.scss'

const Main = ({
  widgets,
  topSlot,
  bottomSlot,
  settings,
  setSettings,
  ...props
}) => {
  /* const { options, project, setSettings, setIsICOPriceDisabled } = props */

  const { slug } = settings

  function onProjectSelect(project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings((state) => ({ ...state, slug, title, projectId, ticker }))
    /* setIsICOPriceDisabled(true) */
    /* onSlugChange(slug) */
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
      <div
        className={cx(styles.container, styles.content, styles.container_chart)}
      >
        <Switch>
          <Route path='/studio/stats'>
            <StudioTabsKeyStats slug={slug} />
          </Route>
          <Route path='/studio'>
            <TabsWidgets {...props} settings={settings} widgets={widgets} />
          </Route>
        </Switch>
      </div>
      {bottomSlot}
    </>
  )
}

export default Main

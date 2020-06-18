import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from '../Studio/Tabs'
import TabsWidgets from './Tabs/Widgets'
import StudioTabsKeyStats from '../Studio/Tabs/KeyStats'
import StudioInfo from '../SANCharts/Header'
import styles from '../Studio/index.module.scss'

const isChartPath = () => window.location.pathname === '/studio'

const Main = ({
  widgets,
  topSlot,
  bottomSlot,
  onSlugChange,
  onProjectChange,
  ...props
}) => {
  const {
    settings,
    options,
    project,
    setSettings,
    setIsICOPriceDisabled,
  } = props

  function onProjectSelect(project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings((state) => ({ ...state, slug, title, projectId, ticker }))
    /* setIsICOPriceDisabled(true) */
    onSlugChange(slug)
    /* onProjectChange && onProjectChange(project) */
  }

  return (
    <>
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <StudioTabs />
      <div
        className={cx(
          styles.container,
          styles.content,
          !options.isMultiChartsActive &&
            isChartPath() &&
            styles.container_chart,
        )}
      >
        <Switch>
          <Route path='/studio/stats'>
            <StudioTabsKeyStats {...props} {...settings} />
          </Route>
          <Route path='/studio'>
            <TabsWidgets {...props} widgets={widgets} />
            {/* <StudioTabsChart
                {...props}
                project={project}
                onProjectSelect={onProjectSelect}
                /> */}
          </Route>
        </Switch>
      </div>
      {bottomSlot}
    </>
  )
}

export default Main

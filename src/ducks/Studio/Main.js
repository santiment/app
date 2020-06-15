import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from './Tabs'
import StudioTabsChart from './Tabs/Chart'
import StudioTabsKeyStats from './Tabs/KeyStats'
import StudioInfo from '../SANCharts/Header'
import { Metric } from '../dataHub/metrics'
import styles from './index.module.scss'

const { price_usd } = Metric
const isChartPath = () => window.location.pathname === '/studio'
const noPriceFilter = metric => metric !== price_usd

const Main = ({
  topSlot,
  bottomSlot,
  onSlugChange,
  onProjectChange,
  ...props
}) => {
  const {
    settings,
    options,
    activeMetrics,
    project,
    setSettings,
    setIsICOPriceDisabled
  } = props

  const isSingleChart =
    !options.isMultiChartsActive ||
    activeMetrics.filter(noPriceFilter).length < 2

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId, ticker }))
    setIsICOPriceDisabled(true)
    onSlugChange(slug)
    onProjectChange && onProjectChange(project)
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
          isSingleChart && isChartPath() && styles.container_chart
        )}
      >
        <Switch>
          <Route path='/studio/stats'>
            <StudioTabsKeyStats {...props} {...settings} />
          </Route>
          <Route path='/studio'>
            <StudioTabsChart
              {...props}
              project={project}
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

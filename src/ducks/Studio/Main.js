import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from './Tabs'
import StudioTabsChart from './Tabs/Chart'
import StudioTabsKeyStats from './Tabs/KeyStats'
import StudioInfo from '../SANCharts/Header'
import SanbaseBanner from '../../components/SanbaseBanner/SanbaseBanner'
import { Metric } from '../dataHub/metrics'
import { PATHS } from '../../App'
import styles from './index.module.scss'

const { price_usd } = Metric
const isChartPath = pathname => pathname === PATHS.STUDIO
const noPriceFilter = metric => metric !== price_usd

function getCorrectPath () {
  const { pathname } = window.location

  if (pathname.indexOf(PATHS.CHARTS) !== -1) {
    return PATHS.CHARTS
  }

  return PATHS.STUDIO
}

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

  const pathName = getCorrectPath()

  return (
    <>
      <SanbaseBanner />
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <StudioTabs root={pathName} />
      <div
        className={cx(
          styles.container,
          styles.content,
          isSingleChart && isChartPath(pathName) && styles.container_chart
        )}
      >
        <Switch>
          <Route path={`${pathName}/stats`}>
            <StudioTabsKeyStats {...props} {...settings} />
          </Route>
          <Route path={pathName}>
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

import React from 'react'
import cx from 'classnames'
import Loadable from 'react-loadable'
import { Switch, Route } from 'react-router-dom'
import StudioTabs from './Tabs'
import StudioTabsKeyStats from './Tabs/KeyStats'
import TabsWidgets from './Tabs/Widgets'
import StudioInfo from '../SANCharts/Header'
import SanbaseBanner from '../../components/SanbaseBanner/SanbaseBanner'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './Main.module.scss'

const LoadableRelatedInsights = Loadable({
  loader: () => import('./RelatedInsights/RelatedInsights'),
  loading: () => <PageLoader />
})
const LoadableFeesDistribution = Loadable({
  loader: () => import('./FeesDistribution/FeesDistribution'),
  loading: () => <PageLoader />
})

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
  const isEth = slug === 'ethereum'

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings({ ...settings, slug, title, name, projectId, ticker })
    setIsICOPriceDisabled(true)
  }

  return (
    <>
      <SanbaseBanner />
      <div className={styles.header}>
        {topSlot}
        <StudioInfo slug={slug} onSlugSelect={onProjectSelect} />
      </div>
      <StudioTabs settings={settings} />
      <div className={cx(styles.container, styles.content)}>
        <Switch>
          <Route path='/:base/related-insights'>
            <LoadableRelatedInsights settings={settings} />
          </Route>
          <Route path='/:base/stats'>
            <StudioTabsKeyStats slug={slug} />
          </Route>
          {isEth && (
            <Route path='/:base/fees-distribution'>
              <LoadableFeesDistribution settings={settings} />
            </Route>
          )}
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

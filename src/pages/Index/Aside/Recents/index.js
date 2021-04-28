import React, { useMemo, useState } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import Assets from './Assets'
import ChartLayouts from './ChartLayouts'
import Watchlists from './Watchlists'
import Section from '../Section'
import {
  getRecentAssets,
  getRecentWatchlists,
  getRecentScreeners,
  getRecentTemplates
} from '../../../../utils/recent'
import styles from './Recents.module.scss'

const RECENT_GETTERS = [
  getRecentAssets,
  () => getRecentTemplates().map(id => +id),
  getRecentWatchlists,
  getRecentScreeners
]
const recentGetter = getter => getter()
const getRecents = () => RECENT_GETTERS.map(recentGetter)

const ASSETS = 'Assets'
const CHART_LAYOUTS = 'Chart Layouts'
const WATCHLISTS = 'Watchlists'
const SCREENERS = 'Screeners'

const TAB_COMPONENT = {
  [ASSETS]: ({ assets }) => <Assets slugs={assets} />,
  [CHART_LAYOUTS]: ({ chartLayouts }) => <ChartLayouts ids={chartLayouts} />,
  [WATCHLISTS]: ({ watchlists }) => <Watchlists ids={watchlists} />,
  [SCREENERS]: ({ screeners }) => <Watchlists ids={screeners} />
}

const Recents = () => {
  const [assets, chartLayouts, watchlists, screeners] = useMemo(getRecents, [])

  const availableTabs = useMemo(
    () => {
      return [
        assets.length > 0 && ASSETS,
        chartLayouts.length > 0 && CHART_LAYOUTS,
        watchlists.length > 0 && WATCHLISTS,
        screeners.length > 0 && SCREENERS
      ].filter(Boolean)
    },
    [assets, chartLayouts, watchlists, screeners]
  )

  const [tab, setTab] = useState(availableTabs[0])

  if (availableTabs.length === 0) {
    return null
  }

  const Component = TAB_COMPONENT[tab]

  return (
    <Section title='Recently viewed'>
      <Tabs
        className={styles.tabs}
        options={availableTabs}
        defaultSelectedIndex={tab}
        onSelect={tab => setTab(tab)}
        classes={styles}
      />

      {Component && (
        <Component
          assets={assets}
          chartLayouts={chartLayouts}
          watchlists={watchlists}
          screeners={screeners}
        />
      )}
    </Section>
  )
}

export default Recents

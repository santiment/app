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

const TABS = [ASSETS, CHART_LAYOUTS, WATCHLISTS, SCREENERS]

const TAB_COMPONENT = {
  [ASSETS]: ({ assets }) => <Assets slugs={assets} />,
  [CHART_LAYOUTS]: ({ chartLayouts }) => <ChartLayouts ids={chartLayouts} />,
  [WATCHLISTS]: ({ watchlists }) => <Watchlists ids={watchlists} />,
  [SCREENERS]: ({ screeners }) => <Watchlists ids={screeners} />
}

const Recents = () => {
  const [assets, chartLayouts, watchlists, screeners] = useMemo(getRecents, [])

  const [tab, setTab] = useState(TABS[0])

  if (
    assets.length +
      chartLayouts.length +
      watchlists.length +
      screeners.length ===
    0
  ) {
    return null
  }

  const Component = TAB_COMPONENT[tab]

  return (
    <Section title='Recently viewed'>
      <Tabs
        className={styles.tabs}
        options={TABS}
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

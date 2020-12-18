import React, { useMemo } from 'react'
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

const RECENT_GETTERS = [
  getRecentAssets,
  () => getRecentTemplates().map(id => +id),
  getRecentWatchlists,
  getRecentScreeners
]
const recentGetter = getter => getter()
const getRecents = () => RECENT_GETTERS.map(recentGetter)

const Recents = () => {
  const [assets, chartLayouts, watchlists, screeners] = useMemo(getRecents, [])

  if (
    assets.length +
      chartLayouts.length +
      watchlists.length +
      screeners.length ===
    0
  ) {
    return null
  }

  return (
    <Section title='Recently viewed'>
      {!!assets.length && <Assets slugs={assets} />}
      {!!chartLayouts.length && <ChartLayouts ids={chartLayouts} />}
      {!!watchlists.length && <Watchlists ids={watchlists} />}
      {!!screeners.length && <Watchlists title='Screeners' ids={screeners} />}
    </Section>
  )
}

export default Recents

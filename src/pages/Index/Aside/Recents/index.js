import React, { useMemo } from 'react'
import Assets from './Assets'
import Watchlists from './Watchlists'
import Section from '../Section'
import {
  getRecentAssets,
  getRecentWatchlists,
  getRecentScreeners
} from '../../../../utils/recent'

const Recents = () => {
  const [assets, watchlists, screeners] = useMemo(
    () => [getRecentAssets(), getRecentWatchlists(), getRecentScreeners()],
    []
  )

  if (assets.length + watchlists.length + screeners.length === 0) {
    return null
  }

  return (
    <Section title='Recents'>
      {!!assets.length && <Assets slugs={assets} />}
      {!!watchlists.length && <Watchlists ids={watchlists} />}
      {!!screeners.length && <Watchlists title='Screeners' ids={screeners} />}
    </Section>
  )
}

export default Recents

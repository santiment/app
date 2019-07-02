import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Label, Panel, Tabs } from '@santiment-network/ui'
import { TOP_SOCIAL_GAINERS_LOSERS_QUERY } from '../../ducks/GainersAndLosers/gainersLosersQuery'
import ProjectIcon from '../ProjectIcon'
import PercentChanges from '../PercentChanges'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import styles from './GainersLosersTabs.module.scss'

const Item = ({ slug, change }) => (
  <div className={styles.project}>
    <ProjectIcon name={slug} size={20} />
    <Label className={styles.name}>{slug}</Label>
    <PercentChanges changes={change} className={styles.changes} />
  </div>
)

const TYPES = {
  gainers: 'Top gainers',
  losers: 'Top losers'
}

const tabs = [
  {
    index: TYPES.gainers,
    content: TYPES.gainers
  },
  {
    index: TYPES.losers,
    content: TYPES.losers
  }
]

const GainersLosersTabs = ({ gainers, losers }) => {
  let [selectedTab, setSelectedTab] = useState(tabs[0].index)

  function handleSelectTab (tab) {
    if (tab !== selectedTab) {
      setSelectedTab(tab)
    }
  }

  return (
    <Panel>
      <Tabs
        className={styles.tabs}
        options={tabs}
        defaultSelectedIndex={selectedTab}
        onSelect={handleSelectTab}
      />
      <div className={styles.wrapper}>
        {selectedTab === TYPES.gainers &&
          gainers.map((project, idx) => <Item key={idx} {...project} />)}
        {selectedTab === TYPES.losers &&
          losers.map((project, idx) => <Item key={idx} {...project} />)}
      </div>
    </Panel>
  )
}

const withGainersLosers = graphql(TOP_SOCIAL_GAINERS_LOSERS_QUERY, {
  options: ({ timeWindow, size }) => {
    const { from, to } = getTimeIntervalFromToday(-2, DAY)
    return {
      variables: {
        size,
        from: from.toISOString(),
        to: to.toISOString(),
        timeWindow,
        status: 'ALL'
      }
    }
  },
  props: ({ data: { topSocialGainersLosers = [], loading } }) => {
    const { length } = topSocialGainersLosers
    const gainers = []
    const losers = []
    if (length > 0) {
      topSocialGainersLosers[length - 1].projects.forEach(project => {
        if (project.status === 'GAINER') gainers.push(project)
        if (project.status === 'LOSER') losers.push(project)
      })
    }

    return { gainers, losers, isLoading: loading }
  }
})

export default withGainersLosers(GainersLosersTabs)

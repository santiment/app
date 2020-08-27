import React, { useMemo, useState } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import { getIntervalDates } from '../StablecoinsMarketCap/utils'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { sortByValue, useAggregatedProjects } from '../utils'
import { millify } from '../../../utils/formatting'
import styles from './NetworkActivity.module.scss'

const TABS = {
  'Daily Addresses': {
    metric: 'daily_active_addresses'
  },
  'Token Velocity': {
    metric: 'velocity'
  },
  'Network Growth': {
    metric: 'network_growth'
  }
}

const NetworkActivity = ({ interval }) => {
  const [tab, setTab] = useState('Daily Addresses')
  const { data, loading } = useAggregatedProjects({
    ...TABS[tab],
    ...getIntervalDates(interval)
  })

  const prepared = useMemo(
    () => {
      return data.filter(({ value }) => value > 0).sort(sortByValue)
    },
    [data]
  )

  return (
    <div className={styles.container}>
      <Tabs
        className={styles.tabs}
        options={Object.keys(TABS)}
        defaultSelectedIndex={tab}
        onSelect={tab => setTab(tab)}
        classes={styles}
      />
      <div className={styles.chart}>
        {loading ? (
          <PageLoader className={styles.loader} />
        ) : (
          <ProjectsBarChart
            data={prepared}
            settings={{
              yTickFormatter: val => `${millify(val)}`
            }}
          />
        )}
      </div>
    </div>
  )
}

export default NetworkActivity

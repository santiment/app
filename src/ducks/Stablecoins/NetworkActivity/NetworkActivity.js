import React, { useMemo, useState } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
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

const NetworkActivity = ({ settings }) => {
  const [tab, setTab] = useState('Daily Addresses')
  const { data, loading } = useAggregatedProjects({
    ...TABS[tab],
    ...settings
  })

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
          <ProjectsPreparedChart data={data} logScale={true} />
        )}
      </div>
    </div>
  )
}

export const ProjectsPreparedChart = ({ data, logScale = false }) => {
  const prepared = useMemo(
    () => {
      return data
        .sort(sortByValue)
        .filter(({ value }) => +value !== 0)
        .map(item => {
          return {
            ...item,
            logValue: logScale ? Math.log(+item.value) : item.value
          }
        })
    },
    [data]
  )

  return (
    <ProjectsBarChart
      data={prepared}
      dataKey={'logValue'}
      settings={{
        yTickFormatter: val => `${millify(val)}`
      }}
    />
  )
}

export default NetworkActivity

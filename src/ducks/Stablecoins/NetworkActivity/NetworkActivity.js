import React, { useMemo, useState } from 'react'
import { getIntervalByTimeRange } from '../../../utils/dates'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { useAggregatedProjects } from '../utils'
import styles from './NetworkActivity.module.scss'
import Tabs from '@santiment-network/ui/Tabs'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'

const DEFAULT_SETTINGS = {
  metric: 'transaction_volume',
  ...getIntervalByTimeRange('1d')
}

const TABS = {
  'Daily Addresses': {
    metric: 'daily_active_addresses',
    ...getIntervalByTimeRange('1d')
  },
  'Trx Volume': {
    metric: 'transaction_volume',
    ...getIntervalByTimeRange('1d')
  },
  'Token Velocity': {
    metric: 'velocity',
    ...getIntervalByTimeRange('1d')
  }
}

const NetworkActivity = () => {
  const [tab, setTab] = useState('Daily Addresses')
  const { data, loading } = useAggregatedProjects(TABS[tab])

  const prepared = useMemo(
    () => {
      return data.filter(({ value }) => value > 0)
    },
    [data]
  )

  return (
    <div className={styles.container}>
      <Tabs
        className={styles.tabs}
        options={Object.keys(TABS)}
        defaultSelectedIndex={tab}
        onSelect={setTab}
      />
      <div className={styles.chart}>
        {loading ? (
          <PageLoader className={styles.loader} />
        ) : (
          <ProjectsBarChart data={prepared} />
        )}
      </div>
    </div>
  )
}

export default NetworkActivity

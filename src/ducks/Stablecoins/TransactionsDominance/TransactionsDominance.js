import React, { useMemo } from 'react'
import { getIntervalByTimeRange } from '../../../utils/dates'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { sortByValue, useAggregatedProjects } from '../utils'
import styles from './TransactionsDominance.module.scss'

const DEFAULT_SETTINGS = {
  metric: 'transaction_volume',
  ...getIntervalByTimeRange('1d')
}

const TransactionsDominance = () => {
  const { data, loading } = useAggregatedProjects(DEFAULT_SETTINGS)

  const prepared = useMemo(
    () => {
      return data.filter(({ value }) => value > 0).sort(sortByValue)
    },
    [data]
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <ProjectsBarChart data={prepared} />
    </div>
  )
}

export default TransactionsDominance

import React, { useMemo } from 'react'
import { getIntervalByTimeRange } from '../../../utils/dates'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { useAggregatedProjects } from '../utils'
import styles from './TransactionsDominance.module.scss'

const DEFAULT_SETTINGS = {
  metric: 'transaction_volume',
  ...getIntervalByTimeRange('1d')
}

export const sortByVolume = (a, b) => b.value - a.value

const TransactionsDominance = () => {
  const { data, loading } = useAggregatedProjects(DEFAULT_SETTINGS)

  const prepared = useMemo(
    () => {
      return data.filter(({ value }) => value > 0).sort(sortByVolume)
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

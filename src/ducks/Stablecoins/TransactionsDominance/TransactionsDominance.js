import React, { useMemo, useState } from 'react'
import { getIntervalByTimeRange } from '../../../utils/dates'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { sortByValue, useAggregatedProjects } from '../utils'
import { millify } from '../../../utils/formatting'
import styles from './TransactionsDominance.module.scss'
import { Toggle } from '@santiment-network/ui'

const DEFAULT_SETTINGS = {
  metric: 'transaction_volume',
  ...getIntervalByTimeRange('1d')
}

const calculatePercentValues = data => {
  const sum = data.reduce((acc, { value }) => {
    return acc + value
  }, 0)

  return data.map(item => ({
    ...item,
    value: (100 * item.value) / sum
  }))
}

const TransactionsDominance = () => {
  const { data, loading } = useAggregatedProjects(DEFAULT_SETTINGS)
  const [isAbsolute, setIsAbsolute] = useState(true)

  const prepared = useMemo(
    () => {
      const filtered = data.filter(({ value }) => value > 0)

      const newData = isAbsolute ? filtered : calculatePercentValues(filtered)

      return newData.sort(sortByValue)
    },
    [data, isAbsolute]
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.toggle} onClick={() => setIsAbsolute(!isAbsolute)}>
        <Toggle isActive={isAbsolute} />
        <div className={styles.toggleText}>Absolute view</div>
      </div>
      <ProjectsBarChart
        data={prepared}
        settings={{
          yTickFormatter: val =>
            isAbsolute ? `${millify(val)}` : `${millify(val)} %`
        }}
      />
    </div>
  )
}

export default TransactionsDominance

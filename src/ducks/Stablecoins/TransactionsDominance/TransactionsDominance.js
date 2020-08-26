import React, { useMemo, useState } from 'react'
import { Toggle } from '@santiment-network/ui'
import { getIntervalDates } from '../StablecoinsMarketCap/utils'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import { sortByValue, useAggregatedProjects } from '../utils'
import { millify } from '../../../utils/formatting'
import styles from './TransactionsDominance.module.scss'

const DEFAULT_SETTINGS = {
  metric: 'transaction_volume'
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

const TransactionsDominance = ({ interval }) => {
  const { data, loading } = useAggregatedProjects({
    ...DEFAULT_SETTINGS,
    ...getIntervalDates(interval)
  })
  const [isAbsolute, setIsAbsolute] = useState(true)

  const prepared = useMemo(
    () => {
      const filtered = data.filter(({ value }) => value > 0)

      const newData = isAbsolute ? filtered : calculatePercentValues(filtered)

      return newData.sort(sortByValue)
    },
    [data, isAbsolute]
  )

  return (
    <div className={styles.container}>
      {loading && <PageLoader />}
      {!loading && (
        <>
          <div
            className={styles.toggle}
            onClick={() => setIsAbsolute(!isAbsolute)}
          >
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
        </>
      )}
    </div>
  )
}

export default TransactionsDominance

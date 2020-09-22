import React, { useMemo, useState } from 'react'
import { Toggle } from '@santiment-network/ui'
import ProjectsBarChartWrapper from '../ProjectsBarChart/ProjectsBarChartWrapper'
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

const TransactionsDominance = ({ settings }) => {
  const { data, loading } = useAggregatedProjects({
    ...DEFAULT_SETTINGS,
    ...settings
  })
  const [isDominance, setIsDominance] = useState(false)

  const prepared = useMemo(
    () => {
      const filtered = data.filter(({ value }) => value > 0)

      const newData = isDominance ? calculatePercentValues(filtered) : filtered

      return newData.sort(sortByValue)
    },
    [data, isDominance]
  )

  return (
    <div className={styles.container}>
      {loading && <PageLoader />}
      {!loading && (
        <>
          <div
            className={styles.toggle}
            onClick={() => setIsDominance(!isDominance)}
          >
            <Toggle isActive={isDominance} />
            <div className={styles.toggleText}>
              Switch to transaction dominance
            </div>
          </div>
          <ProjectsBarChartWrapper
            data={prepared}
            settings={{
              valueFormatter: val =>
                isDominance ? `${millify(val)} %` : `${millify(val)}`
            }}
          />
        </>
      )}
    </div>
  )
}

export default TransactionsDominance

import React from 'react'
import Button from '@santiment-network/ui/Button'
import styles from './DashboardMetricSelectors.module.scss'

const DashboardMetricSelectors = ({
  metricSelectors,
  rootMetric,
  setRootMetric
}) => {
  if (!metricSelectors) {
    return null
  }

  return (
    <div className={styles.metrics}>
      {metricSelectors.map(metric => {
        const { label, key } = metric
        const isActive = rootMetric.key === key
        return (
          <Button
            className={styles.metricBtn}
            key={key}
            variant={isActive ? 'flat' : 'ghost'}
            isActive={isActive}
            onClick={() => setRootMetric(metric)}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default DashboardMetricSelectors

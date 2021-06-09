import React, { useState } from 'react'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import { Metric } from '../../../ducks/dataHub/metrics'
import { getRecentMetrics } from '../../../utils/recent'
import styles from './MobilePopularMetrics.module.scss'

const ARRAY = []

const RecentlyUsedMetrics = ({
  metrics: activeMetrics = ARRAY,
  onToggleMetric,
  ...rest
}) => {
  const recents = getRecentMetrics() || ARRAY
  const [savedMetrics] = useState(activeMetrics)
  const metrics = recents
    .filter(key => !activeMetrics.includes(Metric[key]))
    .slice(0, 3)

  return metrics.length > 0 ? (
    <>
      <h3 className={styles.heading}>Recently used metrics</h3>
      {metrics.map(key => (
        <MobileMetricCard
          useInitialAnimation={
            activeMetrics.length > 0 || savedMetrics !== activeMetrics
          }
          metric={Metric[key]}
          onToggleMetric={() => onToggleMetric(Metric[key])}
          key={key + 'recent'}
          {...rest}
        />
      ))}
    </>
  ) : null
}

export default RecentlyUsedMetrics

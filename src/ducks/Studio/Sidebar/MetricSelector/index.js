import React, { useMemo } from 'react'
import Category from './Category'
import { TopHolderMetric } from '../../Chart/Sidepane/HolderDistribution/metrics'
import styles from './index.module.scss'

const MetricSelector = ({ categories = {}, availableMetrics, ...rest }) => {
  const hasTopHolders = useMemo(
    () =>
      availableMetrics.includes(
        TopHolderMetric.holders_distribution_1_to_10.key,
      ),
    [availableMetrics],
  )

  return (
    <div className={styles.wrapper}>
      {Object.keys(categories).map((key) => (
        <Category
          key={key}
          title={key}
          groups={categories[key]}
          hasTopHolders={key === 'On-chain' && hasTopHolders}
          {...rest}
        />
      ))}
    </div>
  )
}

export default MetricSelector

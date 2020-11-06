import React, { useMemo, useEffect } from 'react'
import Category from '../Category'
import { HolderDistributionMetric } from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { rebuildDescriptions } from '../../../dataHub/metrics/descriptions'

const MetricSelector = ({ categories = {}, availableMetrics, ...props }) => {
  const { Submetrics } = props

  const hasTopHolders = useMemo(
    () =>
      availableMetrics.includes(
        HolderDistributionMetric.holders_distribution_1_to_10.key
      ),
    [availableMetrics]
  )

  useEffect(
    () => {
      rebuildDescriptions(Submetrics)
    },
    [Submetrics]
  )

  return Object.keys(categories).map(key => (
    <Category
      key={key}
      title={key}
      groups={categories[key]}
      hasTopHolders={key === 'On-chain' && hasTopHolders}
      {...props}
    />
  ))
}

export default MetricSelector

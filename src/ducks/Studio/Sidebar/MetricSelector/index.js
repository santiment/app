import React, { useState, useEffect } from 'react'
import Category from './Category'
import { TopHolderMetric } from '../../Chart/Sidepane/TopHolders/metrics'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

const { price_usd } = Metric

const MetricSelector = ({
  loading,
  categories = {},
  activeMetrics,
  activeEvents,
  availableMetrics,
  ...rest
}) => {
  const [hasTopHolders, setHasTopHolders] = useState()
  const { options, setOptions } = rest
  const actives = activeMetrics.concat(activeEvents)

  useEffect(
    () => {
      setHasTopHolders(
        availableMetrics.includes(
          TopHolderMetric.holders_distribution_1_to_10.key
        )
      )
    },
    [availableMetrics]
  )

  useEffect(
    () => {
      if (options.isICOPriceActive && !activeMetrics.includes(price_usd)) {
        setOptions(state => ({ ...state, isICOPriceActive: false }))
      }
    },
    [activeMetrics]
  )

  function toggleICOPrice () {
    setOptions(state => ({
      ...state,
      isICOPriceActive: !state.isICOPriceActive
    }))
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(categories).map(key => (
        <Category
          key={key}
          title={key}
          groups={categories[key]}
          actives={actives}
          toggleICOPrice={toggleICOPrice}
          hasTopHolders={key === 'On-chain' && hasTopHolders}
          {...rest}
        />
      ))}
    </div>
  )
}

export default MetricSelector

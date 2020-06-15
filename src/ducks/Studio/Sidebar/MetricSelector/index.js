import React, { useState, useEffect } from 'react'
import Category from './Category'
import { TopHolderMetric } from '../../Chart/Sidepane/TopHolders/metrics'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

const { price_usd } = Metric

const MetricSelector = ({ categories = {}, availableMetrics, ...rest }) => {
  const [hasTopHolders, setHasTopHolders] = useState()
  const { setOptions } = rest

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
          toggleICOPrice={toggleICOPrice}
          hasTopHolders={key === 'On-chain' && hasTopHolders}
          {...rest}
        />
      ))}
    </div>
  )
}

export default MetricSelector

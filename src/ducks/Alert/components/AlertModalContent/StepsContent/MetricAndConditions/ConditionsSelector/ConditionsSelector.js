import React from 'react'
import TimeWindowSelector from './TimeWindowSelector/TimeWindowSelector'
import OperationSelector from './OperationSelector/OperationSelector'
import ChartPreview from './ChartPreview/ChartPreview'
import styles from './ConditionsSelector.module.scss'

const ConditionsSelector = ({ metric, isWallet }) => (
  <div className={styles.wrapper}>
    <div className={styles.selectors}>
      <OperationSelector metric={metric} isWallet={isWallet} />
      <TimeWindowSelector />
    </div>
    <ChartPreview isWallet={isWallet} />
  </div>
)

export default ConditionsSelector

import React from 'react'
import TimeWindowSelector from './TimeWindowSelector/TimeWindowSelector'
import OperationSelector from './OperationSelector/OperationSelector'
import ChartPreview from './ChartPreview/ChartPreview'
import styles from './ConditionsSelector.module.scss'

const ConditionsSelector = () => {
  return (
    <div className={styles.wrapper}>
      <OperationSelector />
      <TimeWindowSelector />
      <ChartPreview />
    </div>
  )
}

export default ConditionsSelector

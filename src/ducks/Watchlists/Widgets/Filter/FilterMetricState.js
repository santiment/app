import React from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './FilterMetricState.module.scss'

const FilterMetricState = ({
  isActive,
  onCheckboxClicked,
  isAuthor,
  metric
}) => (
  <div className={styles.wrapper}>
    <div
      onClick={() => (isAuthor ? onCheckboxClicked() : null)}
      className={styles.title}
    >
      <Checkbox
        isActive={isActive}
        disabled={!isAuthor}
        className={styles.checkbox}
      />
      <span className={styles.label}>{metric.label}</span>
    </div>
  </div>
)

export default FilterMetricState

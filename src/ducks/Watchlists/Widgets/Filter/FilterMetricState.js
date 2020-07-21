import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import MetricExplanation from '../../../SANCharts/MetricExplanation'
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
    <MetricExplanation metric={metric} position='right'>
      <Icon type='info-round-small' className={styles.info} />
    </MetricExplanation>
  </div>
)

export default FilterMetricState

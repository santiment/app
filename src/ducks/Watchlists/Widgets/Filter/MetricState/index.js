import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import MetricExplanation from '../../../../SANCharts/MetricExplanation'
import Explanation from './Explanation'
import styles from './index.module.scss'

const FilterMetricState = ({
  isActive,
  onCheckboxClicked,
  isAuthor,
  metric,
  settings
}) => (
  <div className={styles.wrapper}>
    <div onClick={() => (isAuthor ? onCheckboxClicked() : null)}>
      <Checkbox
        isActive={isActive}
        disabled={!isAuthor}
        className={styles.checkbox}
      />
      <div className={styles.title}>
        <span className={styles.label}>{metric.label}</span>
        <Explanation
          {...settings}
          metric={metric}
          className={styles.explanation}
        />
      </div>
    </div>
    <MetricExplanation on='click' metric={metric} position='right'>
      <Icon type='info-round-small' className={styles.info} />
    </MetricExplanation>
  </div>
)

export default FilterMetricState

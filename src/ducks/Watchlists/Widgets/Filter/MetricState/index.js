import React from 'react'
import cx from 'classnames'
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
        disabled={!isAuthor && !isActive}
        className={styles.checkbox}
      />
      <div className={cx(styles.title, !isAuthor && styles.title__notActive)}>
        <span className={styles.label}>{metric.label}</span>
        {isActive && (
          <Explanation
            {...settings}
            metric={metric}
            className={styles.explanation}
          />
        )}
      </div>
    </div>
    <MetricExplanation on='click' metric={metric} position='right'>
      <Icon type='info-round-small' className={styles.info} />
    </MetricExplanation>
  </div>
)

export default FilterMetricState

import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import MetricExplanation from '../../../../../SANCharts/MetricExplanation'
import Explanation from './Explanation'
import DeprecatedLabel from './DeprecatedLabel'
import { Metric } from '../../../../../dataHub/metrics'
import styles from './index.module.scss'

const FilterMetricState = ({
  isActive,
  onCheckboxClicked,
  isViewMode,
  metric,
  settings,
  customStateText = '',
  isFinishedState
}) => {
  const metricForDescription = Metric[metric.descriptionKey || metric.key] || {}

  const isDisabled = isViewMode && !isActive

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => (!isViewMode ? onCheckboxClicked() : null)}
        className={cx(
          styles.toggle,
          isDisabled && styles.toggle__disabled,
          isViewMode && styles.toggle__notActive
        )}
      >
        <Checkbox
          isActive={isActive}
          disabled={isDisabled}
          className={styles.checkbox}
        />
        <div className={styles.title}>
          <span className={styles.label}>{metric.label}</span>
          {metric.isDeprecated && <DeprecatedLabel isAuthor={!isViewMode} />}
          {isActive && (
            <Explanation
              {...settings}
              metric={metric}
              customStateText={customStateText}
              isFinishedState={isFinishedState}
              className={styles.explanation}
            />
          )}
        </div>
      </div>
      <MetricExplanation
        on='click'
        metric={metricForDescription}
        position='bottom'
        align='end'
      >
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    </div>
  )
}

export default FilterMetricState

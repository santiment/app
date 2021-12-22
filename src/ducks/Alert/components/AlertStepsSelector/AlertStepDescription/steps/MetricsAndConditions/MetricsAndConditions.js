import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import { getMetricByKey } from '../../../../../../Studio/metrics'
import {
  getConditionsStr,
  parseOperation,
  splitStr
} from '../../../../../utils'
import styles from './MetricsAndConditions.module.scss'

const MetricsAndConditions = ({ description, isSmall }) => {
  const {
    values: {
      settings: { metric, time_window, operation }
    }
  } = useFormikContext()

  if (metric && !operation.selector) {
    const { selectedCount, selectedOperation } = parseOperation(operation)
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window
    })
    const { firstWord, rest } = splitStr(conditionsStr)
    const selectedMetric = getMetricByKey(metric)
    const metricLabel = selectedMetric ? selectedMetric.label : 'Metric'

    if (isSmall) {
      return (
        <div className={cx(styles.wrapper, styles.small)}>
          <div className={styles.item}>{metricLabel}</div>
          <div className={styles.condition}>
            <span className={styles.conditionType}>{firstWord}</span>
            {rest}
          </div>
        </div>
      )
    }

    return (
      <div className={styles.item}>
        {metricLabel} {conditionsStr}
      </div>
    )
  }

  return description || ''
}

export default MetricsAndConditions

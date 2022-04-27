import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import { getMetricByKey } from '../../../../../../Studio/metrics'
import { getConditionsStr, parseOperation } from '../../../../../utils'
import styles from './MetricsAndConditions.module.scss'

const MetricsAndConditions = ({ description, invalidStepsMemo, isFinished, selected }) => {
  const {
    values: {
      settings: { metric, time_window, operation },
    },
  } = useFormikContext()

  const isInvalid = invalidStepsMemo.has('metric')

  useEffect(() => {
    if (metric && !operation.selector && isInvalid) {
      invalidStepsMemo.delete('metric')
    }
  }, [metric, operation, isInvalid])

  let children = ''

  if (metric && !operation.selector) {
    const { selectedCount, selectedOperation } = parseOperation(operation)
    const selectedMetric = getMetricByKey(metric)
    const metricLabel = selectedMetric ? selectedMetric.label : 'Metric'
    const hasPriceIcon =
      selectedMetric &&
      (selectedMetric.label.includes('price') || selectedMetric.category === 'Financial')
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window,
      hasPriceIcon: !!hasPriceIcon,
    })

    children = (
      <div className={styles.wrapper}>
        <div className={styles.item}>{metricLabel}</div>
        <div className={styles.condition}>{conditionsStr}</div>
      </div>
    )
  } else {
    children = description || ''
  }

  return (
    <div className={styles.col}>
      {(selected || isFinished) && children}
      {isInvalid && <AlertMessage className={styles.error} error text='Metric is required' />}
    </div>
  )
}

export default MetricsAndConditions

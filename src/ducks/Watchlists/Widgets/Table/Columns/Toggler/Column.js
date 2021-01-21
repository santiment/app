import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { Metric } from '../../../../../dataHub/metrics'
import MetricExplanation from '../../../../../SANCharts/MetricExplanation'
import styles from './Column.module.scss'

const EMPTY_OBJ = {}

const Column = ({ onColumnToggle, metric }) => {
  const metricForDescription =
    Metric[metric.descriptionKey || metric.key] || EMPTY_OBJ
  return (
    <div className={styles.column} onClick={() => onColumnToggle()}>
      <Checkbox className={styles.checkbox} isActive={false} disabled={false} />
      <span className={styles.name}>{metric.label}</span>
      <MetricExplanation
        on='click'
        metric={metricForDescription}
        position='bottom'
        align='center'
      >
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    </div>
  )
}

export default Column

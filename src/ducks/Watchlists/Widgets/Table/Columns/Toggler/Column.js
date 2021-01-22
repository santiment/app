import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { Metric } from '../../../../../dataHub/metrics'
import MetricExplanation from '../../../../../SANCharts/MetricExplanation'
import styles from './Column.module.scss'

const EMPTY_OBJ = {}

const Column = ({ onColumnToggle, column, isActive }) => {
  const { key, descriptionKey = key, label } = column
  const metricForDescription = Metric[descriptionKey] || EMPTY_OBJ

  return (
    <div className={styles.column}>
      <div className={styles.clickableZone} onClick={onColumnToggle}>
        <Checkbox className={styles.checkbox} isActive={isActive} />
        <span className={styles.name}>{label}</span>
      </div>
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

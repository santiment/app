import React from 'react'
import { getSelectedAssetMetricCardDescription } from '../../../../../../utils'
import styles from './SelectedMetric.module.scss'

const SelectedMetric = ({ metric, onClick }) => (
  <div onClick={onClick} className={styles.wrapper}>
    <div className={styles.title}>{metric.label}</div>
    <div className={styles.description}>{getSelectedAssetMetricCardDescription(metric)}</div>
  </div>
)

export default SelectedMetric

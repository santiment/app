import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import StepTitle from '../../StepTitle/StepTitle'
import { getSelectedAssetMetricCardDescription } from '../../../../../utils'
import styles from './ConditionsTitle.module.scss'

const ConditionsTitle = ({ metric, onClick }) => (
  <div className={styles.wrapper}>
    <StepTitle iconType='checkmark' title='Choose Metric' finished />
    <div className={styles.selectedWrapper}>
      <div className={styles.selected} onClick={onClick}>
        <div className={styles.title}>
          {metric.label}
          <Icon type='edit' className={styles.icon} />
        </div>
        <div className={styles.description}>
          {getSelectedAssetMetricCardDescription(metric)}
        </div>
      </div>
    </div>
    <StepTitle iconType='customize' title='Conditions' />
  </div>
)

export default ConditionsTitle

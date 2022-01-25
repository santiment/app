import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import StepTitle from '../../StepTitle/StepTitle'
import NextStep from '../../NextStep/NextStep'
import { getSelectedAssetMetricCardDescription } from '../../../../../utils'
import styles from './ConditionsTitle.module.scss'

const ConditionsTitle = ({ metric, onClick, handleNextClick }) => (
  <div className={styles.wrapper}>
    <div className={styles.titleWrapper}>
      <StepTitle title='Choose Metric' />
      <NextStep label='Notification & Privacy' onClick={handleNextClick} />
    </div>
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
)

export default ConditionsTitle

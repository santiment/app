import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from '../Step.module.scss'

function StepIcon({ icons, status, disabled, stepNumber }) {
  let children = <div className={styles.icon}>{stepNumber}</div>
  if (icons && icons.process && status === 'process') {
    children = icons.process
  } else if (status === 'finish' && !disabled) {
    children = <Icon type='checkmark' className={styles.icon} />
  }

  return <div className={styles.iconWrapper}>{children}</div>
}

export default StepIcon

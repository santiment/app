import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { getClassString } from '../utils'
import styles from './StepIcon.module.scss'

function StepIcon ({ icons, status, disabled, stepNumber, size }) {
  const classString = cx(
    styles.wrapper,
    getClassString(styles, disabled, status),
    size === 'small' && styles.small
  )

  if (icons && icons.process && status === 'process') {
    return <div className={classString}>{icons.process}</div>
  }
  if (status === 'finish' && !disabled) {
    return (
      <div className={classString}>
        <Icon type='checkmark' />
      </div>
    )
  }
  return (
    <div className={classString}>
      <span className={styles.icon}>{stepNumber}</span>
    </div>
  )
}

export default StepIcon

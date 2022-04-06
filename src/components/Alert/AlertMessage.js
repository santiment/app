import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './AlertMessage.module.scss'

const AlertMessage = ({ text, warning, error, className }) => {
  return (
    <div className={cx(styles.alert, warning && styles.warning, error && styles.error, className)}>
      {warning && <Icon className={styles.warningIcon} type='alert' />}
      {error && <Icon className={styles.errorIcon} type='error' />}
      <span className={styles.text}>{text}</span>
    </div>
  )
}

export default AlertMessage

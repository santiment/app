import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './AlertMessage.module.scss'

const AlertMessage = ({ text, warning = true }) => {
  return (
    <div className={cx(styles.alert, warning && styles.warning)}>
      {warning && <Icon className={styles.warningIcon} type='alert' />}
      <span className={styles.text}>{text}</span>
    </div>
  )
}

export default AlertMessage

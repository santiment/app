import React from 'react'
import cx from 'classnames'
import styles from './NotificationTypes.module.scss'

const types = [
  {
    type: 'ALL',
    label: 'all',
  },
  {
    type: 'ALERT',
    label: 'alerts',
  },
  {
    type: 'INSIGHT',
    label: 'insights',
  },
]

const NotificationTypes = ({ selected, onChange }) => {
  return (
    <div className={styles.container}>
      {types.map(({ type, label }) => (
        <div
          key={type}
          className={cx(styles.label, selected === type && styles.label__selected)}
          onClick={() => onChange(type)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default NotificationTypes

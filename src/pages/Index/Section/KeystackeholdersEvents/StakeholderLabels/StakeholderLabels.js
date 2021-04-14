import React from 'react'
import cx from 'classnames'
import { READABLE_NAMES } from '../hooks'
import styles from './StakeholderLabels.module.scss'

const StakeholderLabels = ({ labels, hidden, setHidden }) => {
  if (labels.length === 0) {
    return null
  }

  function toggle (label) {
    setHidden({
      ...hidden,
      [label]: !hidden[label]
    })
  }

  return (
    <div className={styles.container}>
      {labels.map(label => (
        <div
          key={label}
          className={cx(styles.label, hidden[label] && styles.label__hidden)}
          onClick={() => toggle(label)}
        >
          {READABLE_NAMES[label] || label}
        </div>
      ))}
    </div>
  )
}

export default StakeholderLabels

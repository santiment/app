import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { READABLE_NAMES } from '../hooks'
import styles from './StakeholderLabels.module.scss'

const MAX_COUNT = 6

const StakeholderLabels = ({ labels, hidden, setHidden }) => {
  const [isOpen, setOpen] = useState(false)

  const visibleLabels = useMemo(
    () => {
      return isOpen ? labels : labels.slice(0, MAX_COUNT)
    },
    [labels, isOpen]
  )

  function toggle (label) {
    setHidden({
      ...hidden,
      [label]: !hidden[label]
    })
  }

  if (labels.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {visibleLabels.map(label => (
        <div
          key={label}
          className={cx(styles.label, hidden[label] && styles.label__hidden)}
          onClick={() => toggle(label)}
        >
          {READABLE_NAMES[label] || label}
        </div>
      ))}

      {labels.length > MAX_COUNT && (
        <div className={styles.label} onClick={() => setOpen(!isOpen)}>
          {!isOpen ? `+${labels.length}` : 'Collapse'}
        </div>
      )}
    </div>
  )
}

export default StakeholderLabels

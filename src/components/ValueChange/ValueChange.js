import React from 'react'
import { Label, Icon } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './ValueChange.module.scss'

const Change = {
  true: ['jungle-green', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
}

const notChanged = ['texas-rose', 'lock-small']

const ValueChange = ({ className, change, render, label }) => {
  const [accent, triangle] = change !== 0 ? Change[change > 0] : notChanged

  return (
    <Label accent={accent} className={cx(styles.change, className)}>
      <Icon type={triangle} className={styles.triangle} />
      {render(Math.abs(change))}
      {label && <span className={styles.label}>{label}</span>}
    </Label>
  )
}

ValueChange.defaultProps = {
  change: 0,
  render: change => change
}

export default ValueChange

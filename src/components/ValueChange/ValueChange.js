import React from 'react'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './ValueChange.module.scss'

const Change = {
  true: ['lima', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
}

const notChanged = ['texas-rose', 'lock-small']

const ValueChange = ({ className, change, render }) => {
  const changed = change !== 0
  const [accent, triangle] = changed ? Change[change > 0] : notChanged

  return (
    <span
      className={cx(styles.change, className)}
      style={{ color: `var(--${accent})`, fill: `var(--${accent})` }}
    >
      {changed && <Icon type={triangle} className={styles.triangle} />}
      {render(Math.abs(change))}
    </span>
  )
}

ValueChange.defaultProps = {
  change: 0,
  render: change => change
}

export default ValueChange

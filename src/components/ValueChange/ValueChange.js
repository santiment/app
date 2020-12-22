import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './ValueChange.module.scss'

const Change = {
  true: ['lima', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
}

const notChanged = ['texas-rose', 'lock-small']

const ValueChange = ({ className, suffix, change, render }) => {
  const changed = change !== 0
  const [accent, triangle] = changed ? Change[change > 0] : notChanged

  return (
    <span
      className={cx(styles.wrapper, className)}
      style={{ color: `var(--${accent})`, fill: `var(--${accent})` }}
    >
      {changed && (
        <div
          className={styles.triangle}
          style={{ background: `var(--${accent}-light)` }}
        >
          <Icon type={triangle} />
        </div>
      )}
      {render(Math.abs(change))}
      {suffix}
    </span>
  )
}

ValueChange.defaultProps = {
  change: 0,
  render: change => change
}

export default ValueChange

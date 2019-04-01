import React from 'react'
import { Label, Icon } from '@santiment-network/ui'
import styles from './ValueChange.module.scss'

const Change = {
  true: ['jungle-green', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
}

const notChanged = ['texas-rose', 'lock-small']

const ValueChange = ({ oldValue, newValue, render }) => {
  const amp = newValue - oldValue
  const [accent, triangle] = amp !== 0 ? Change[amp > 0] : notChanged

  return (
    <Label accent={accent} className={styles.change}>
      <Icon type={triangle} className={styles.triangle} />
      {render(Math.abs(amp))}
    </Label>
  )
}

ValueChange.defaultProps = {
  newValue: 0,
  oldValue: 0,
  render: amp => amp
}

export default ValueChange

import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { useDebounce } from '../../../../../../hooks'
import { Filter } from '../../dataHub/types'
import styles from './ValueInput.module.scss'

const ValueInput = ({ onChange, type, metric, ...props }) => {
  let badge = Filter[type].badge || metric.badge || ''

  if (badge.length > 1) {
    badge = ''
  }

  const onChangeDebounced = useDebounce(value => {
    let transformedValue = value
    if (Filter[type].onlyPositiveNumbers) {
      transformedValue = Math.abs(value)
    }
    onChange(transformedValue)
  }, 500)

  return (
    <div className={styles.wrapper}>
      <span className={styles.badge}>{badge}</span>
      <Input
        onChange={({ currentTarget: { value } }) => onChangeDebounced(value)}
        className={cx(styles.input, badge && styles.input__withBadge)}
        {...props}
      />
    </div>
  )
}

export default ValueInput

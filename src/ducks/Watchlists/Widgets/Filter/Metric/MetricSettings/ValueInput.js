import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { useDebounce } from '../../../../../../hooks'
import { Filter } from '../../dataHub/types'
import styles from './ValueInput.module.scss'

const ValueInput = ({ onChange, defaultValue, type, metric, autoFocus }) => {
  let badge = Filter[type].badge || metric.badge || ''

  if (badge.length > 1) {
    badge = ''
  }

  const onChangeDebounced = useDebounce(value => onChange(value), 500)

  return (
    <div className={styles.wrapper}>
      <span className={styles.badge}>{badge}</span>
      <Input
        autoFocus={autoFocus}
        onChange={({ currentTarget: { value } }) => onChangeDebounced(value)}
        defaultValue={defaultValue}
        className={cx(styles.input, badge && styles.input__withBadge)}
      />
    </div>
  )
}

export default ValueInput

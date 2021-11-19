import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'

import styles from './AbsoluteThreshold.module.scss'

const AbsoluteThreshold = ({
  type,
  step = 'any',
  prefix,
  placeholder,
  disabled = false,
  onChange,
  min,
  max,
  validator,
  validate,
  value,
  handleFormValueChange,
  className,
  ...rest
}) => {
  const showPrefix = prefix && !!value

  return (
    <div className={cx(styles.field, className)}>
      {showPrefix && <span className={styles.prefix}>{prefix}</span>}
      <Input
        className={cx(styles.input, showPrefix && styles.inputWithPrefix)}
        type={type}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        disabled={disabled}
        noValidate
        onChange={value => {
          const oldValue = value.target.value

          const newValue =
            type === 'number' && oldValue.length > 0
              ? parseFloat(oldValue)
              : oldValue
          handleFormValueChange(newValue)
        }}
        value={value}
        {...rest}
      />
    </div>
  )
}

export default AbsoluteThreshold

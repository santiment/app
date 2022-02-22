import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import styles from './OperationInput.module.scss'

function getValue (e) {
  const currentValue = e.target.value < 0 ? '' : Number(e.target.value)

  return e.target.value === '' ? '' : currentValue
}

const OperationInput = ({
  count,
  hasIcon,
  iconType,
  setCount,
  operation,
  className
}) => {
  let prefix = '$'

  if (iconType === 'percent') {
    prefix = '%'
  }

  if (Array.isArray(count)) {
    function handleChangeCount (e) {
      const value = getValue(e)

      if (value > count[1] && operation !== 'some_of') {
        setCount([value, value])
      } else {
        setCount([value, count[1]])
      }
    }

    function handleChangeSecondCount (e) {
      const value = getValue(e)

      setCount([count[0], value])
    }

    return (
      <div className={cx(styles.wrapper, className)}>
        <div className={styles.inputWrapper}>
          {hasIcon && <span className={styles.prefix}>{prefix}</span>}
          <Input
            type='number'
            value={count[0]}
            onChange={handleChangeCount}
            className={hasIcon && styles.inputWithPrefix}
          />
        </div>
        <div className={styles.inputWrapper}>
          {hasIcon && <span className={styles.prefix}>{prefix}</span>}
          <Input
            type='number'
            min={operation === 'some_of' ? 0 : count[0]}
            value={count[1]}
            onChange={handleChangeSecondCount}
            className={hasIcon && styles.inputWithPrefix}
          />
        </div>
      </div>
    )
  }

  function handleChangeInput (e) {
    const value = getValue(e)

    setCount(value)
  }

  return (
    <div className={cx(styles.inputWrapper, className)}>
      {hasIcon && <span className={styles.prefix}>{prefix}</span>}
      <Input
        type='number'
        className={cx(hasIcon && styles.inputWithPrefix)}
        value={count}
        onChange={handleChangeInput}
      />
    </div>
  )
}

export default OperationInput

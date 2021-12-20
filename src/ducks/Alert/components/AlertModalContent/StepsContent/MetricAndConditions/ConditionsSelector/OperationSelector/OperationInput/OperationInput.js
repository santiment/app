import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import styles from './OperationInput.module.scss'

const OperationInput = ({ count, hasIcon, iconType, setCount, operation }) => {
  let prefix = '$'

  if (iconType === 'percent') {
    prefix = '%'
  }

  if (Array.isArray(count)) {
    function handleChangeCount (e) {
      const value = Number(e.target.value)
      if (value > count[1] && operation !== 'some_of') {
        setCount([value, value])
      } else {
        setCount([value, count[1]])
      }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          {hasIcon && <span className={styles.prefix}>{prefix}</span>}
          <Input
            type='number'
            min={1}
            value={count[0]}
            onChange={handleChangeCount}
            className={cx(hasIcon && styles.inputWithPrefix)}
          />
        </div>
        <div className={styles.inputWrapper}>
          {hasIcon && <span className={styles.prefix}>{prefix}</span>}
          <Input
            type='number'
            min={operation === 'some_of' ? 1 : count[0]}
            value={count[1]}
            onChange={e => setCount([count[0], Number(e.target.value)])}
            className={cx(hasIcon && styles.inputWithPrefix)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.inputWrapper}>
      {hasIcon && <span className={styles.prefix}>{prefix}</span>}
      <Input
        type='number'
        min={1}
        className={cx(styles.singleInput, hasIcon && styles.inputWithPrefix)}
        value={count}
        onChange={e => setCount(Number(e.target.value))}
      />
    </div>
  )
}

export default OperationInput

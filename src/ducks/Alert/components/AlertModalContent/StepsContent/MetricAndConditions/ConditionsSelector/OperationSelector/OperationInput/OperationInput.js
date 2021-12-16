import React from 'react'
import Input from '@santiment-network/ui/Input'
import styles from './OperationInput.module.scss'

const OperationInput = ({ count, hasIcon, iconType, setCount }) => {
  let prefix = '$'

  if (iconType === 'percent') {
    prefix = '%'
  }

  if (Array.isArray(count)) {
    function handleChangeCount (e) {
      const value = e.target.value
      if (value > count[1]) {
        setCount([e.target.value, e.target.value])
      } else {
        setCount([e.target.value, count[1]])
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
          />
        </div>
        <div className={styles.inputWrapper}>
          {hasIcon && <span className={styles.prefix}>{prefix}</span>}
          <Input
            type='number'
            min={count[0]}
            value={count[1]}
            onChange={e => setCount([count[0], e.target.value])}
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
        className={styles.singleInput}
        value={count}
        onChange={e => setCount(e.target.value)}
      />
    </div>
  )
}

export default OperationInput

import React from 'react'
import cx from 'classnames'
import Title from './Title'
import styles from './index.module.scss'

const DepthLevel = ({ name, value, className, onChange }) => {
  return (
    <div className={cx(styles.depth, className)}>
      <Title className={styles.depth__title}>
        Depth level:
        <span className={styles.depth__name}> {name}</span>
      </Title>

      <div className={styles.depth__actions}>
        <div
          className={styles.depth__btn}
          onClick={value < 2 ? undefined : () => onChange(value - 1)}
        >
          –
        </div>
        <div
          className={styles.depth__value}
          style={{ width: value.toString().length + 'ch' }}
        >
          {value}
        </div>
        <div
          className={styles.depth__btn}
          onClick={value > 24 ? undefined : () => onChange(value + 1)}
        >
          +
        </div>
      </div>
    </div>
  )
}

export default DepthLevel

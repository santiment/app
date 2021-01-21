import React, { useState } from 'react'
import cx from 'classnames'
import Title from './Title'
import { useDebounceEffect } from '../../../hooks/index'
import styles from './index.module.scss'

const DepthLevel = ({ name, value, className, onChange }) => {
  const [depth, setDepth] = useState(value)

  useDebounceEffect(() => onChange(depth), 700, [depth])

  return (
    <div className={cx(styles.depth, className)}>
      <Title className={styles.depth__title}>
        Depth level:
        <span className={styles.depth__name}> {name}</span>
      </Title>

      <div className={styles.depth__actions}>
        <div
          className={styles.depth__btn}
          onClick={depth < 2 ? undefined : () => setDepth(depth - 1)}
        >
          –
        </div>
        <div
          className={styles.depth__value}
          style={{ width: depth.toString().length + 'ch' }}
        >
          {depth}
        </div>
        <div
          className={styles.depth__btn}
          onClick={depth > 24 ? undefined : () => setDepth(depth + 1)}
        >
          +
        </div>
      </div>
    </div>
  )
}

export default DepthLevel

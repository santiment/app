import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import styles from './LeftPageNavigation.module.scss'

const LeftPageNavigation = ({ anchors, className }) => {
  const list = useMemo(
    () => {
      return Object.values(anchors)
    },
    [anchors]
  )

  const [active, setActive] = useState(list[0])

  return (
    <div className={cx(styles.container, className)}>
      {list.map(item => {
        const { key, label } = item

        return (
          <a
            key={key}
            href={`#${key}`}
            onClick={() => setActive(item)}
            className={cx(styles.item, key === active.key && styles.active)}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}

export default LeftPageNavigation

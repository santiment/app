import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { HashLink as Link } from 'react-router-hash-link'
import { withRouter } from 'react-router-dom'
import styles from './LeftPageNavigation.module.scss'

const extractFirst = (list, hash) => {
  const matchAnchor = hash ? hash.slice(1) : hash
  return list.find(({ key }) => key === matchAnchor) || list[0]
}

const LeftPageNavigation = ({ anchors, className, location: { hash } }) => {
  const list = useMemo(
    () => {
      return Object.values(anchors)
    },
    [anchors]
  )

  const [active, setActive] = useState(extractFirst(list, hash))

  return (
    <div className={cx(styles.container, className)}>
      {list.map(item => {
        const { key, label } = item

        return (
          <Link
            key={key}
            to={`#${key}`}
            onClick={() => setActive(item)}
            className={cx(styles.item, key === active.key && styles.active)}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}

export default withRouter(LeftPageNavigation)

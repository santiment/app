import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { HashLink as Link } from 'react-router-hash-link'
import { withRouter } from 'react-router-dom'
import { useEventListener } from '../../hooks/eventListeners'
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

  useEventListener('scroll', () => {
    const offsets = list.map(({ key }) => {
      const el = document.getElementById(key)
      const rect = el.getBoundingClientRect()
      return {
        key,
        info: rect,
        top: rect.top + window.scrollY + rect.height / 2
      }
    })

    const border = window.scrollY
    const findCurrentTab = offsets.findIndex(({ top }) => top > border)
    const tab = list[findCurrentTab]

    if (tab) {
      setActive(tab)
    }
  })

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

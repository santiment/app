import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { HashLink as Link } from 'react-router-hash-link'
import { withRouter } from 'react-router-dom'
import { useEventListener } from '../../hooks/eventListeners'
import styles from './LeftPageNavigation.module.scss'

const extractFirst = (list, hash) => {
  const matchAnchor = hash ? hash.slice(1) : hash
  return list.find(({ key }) => key === matchAnchor) || list[0]
}

const LeftPageNavigation = ({ anchors, location: { hash }, history }) => {
  const list = useMemo(
    () => {
      if (Array.isArray(anchors)) {
        return anchors.reduce((acc, val) => {
          return [...acc, ...val.list]
        }, [])
      }

      return Object.values(anchors)
    },
    [anchors]
  )

  const [active, setActive] = useState(extractFirst(list, hash))

  useEffect(
    () => {
      history.replace(`${window.location.pathname}#${active.key}`)
    },
    [active]
  )

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
    <div className={styles.container}>
      {Array.isArray(anchors) ? (
        <>
          {anchors.map(({ title, list }) => {
            return (
              <div key={title} className={styles.list}>
                <div className={styles.title}>{title}</div>

                <RenderList list={list} setActive={setActive} active={active} />
              </div>
            )
          })}
        </>
      ) : (
        <RenderList list={list} setActive={setActive} active={active} />
      )}
    </div>
  )
}

const RenderList = ({ list, setActive, active }) =>
  list.map(item => (
    <NavigationItem
      item={item}
      key={item.key}
      setActive={setActive}
      active={active}
    />
  ))

const NavigationItem = ({ item, setActive, active }) => {
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
}

export default withRouter(LeftPageNavigation)

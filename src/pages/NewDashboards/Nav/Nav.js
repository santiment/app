import React from 'react'
import cx from 'classnames'
import NavItem from './NavItem/NavItem'
import { DASHBOARDS } from '../constants'
import styles from './Nav.module.scss'

const Nav = ({ navSettings }) => {
  const { activeItem, activeSubItem, setActiveItem, setActiveSubItem } = navSettings

  const dashboards = DASHBOARDS.map((dashboard) => {
    const isActive = dashboard.title === activeItem.title

    const hasSub = dashboard.subItems && activeSubItem
    const activeSub = hasSub && dashboard.subItems.find(({ key }) => activeSubItem.key === key)

    return (
      <NavItem
        key={dashboard.title}
        isActive={isActive}
        activeSub={activeSub}
        setActive={setActiveItem}
        setActiveSubItem={setActiveSubItem}
        {...dashboard}
      />
    )
  })

  return (
    <nav className={cx(styles.wrapper, 'column')}>
      <ul>{dashboards}</ul>
    </nav>
  )
}

export default Nav

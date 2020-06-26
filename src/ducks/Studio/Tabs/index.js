import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styles from './index.module.scss'

const TABS = [
  {
    path: '/studio',
    label: 'Studio'
  },
  {
    path: '/studio/stats',
    label: 'Key Stats'
  }
]

const PATHS = TABS.map(({ path }) => path).reverse()

const getPathRoot = path => root => path.includes(root)
const getSubpath = path => path.replace(PATHS.find(getPathRoot(path)), '')

const Tabs = ({ location: { pathname, search } }) => {
  const subpath = getSubpath(pathname)
  return (
    <div className={styles.tabs}>
      {TABS.map(({ path, label }) => (
        <NavLink
          exact
          key={path}
          to={{ pathname: path + subpath, search }}
          className={styles.tab}
          activeClassName={styles.active}
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default withRouter(Tabs)

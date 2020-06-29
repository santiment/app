import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styles from './index.module.scss'

const TABS = [
  {
    path: '',
    label: 'Studio',
  },
  {
    path: '/stats',
    label: 'Key Stats',
  },
]

const SUBPATHS = new Set(TABS.map(({ path }) => path))

function getSubpath(path) {
  const slashPosition = path.lastIndexOf('/', path.length - 2)
  const subpath = path.slice(slashPosition, path.endsWith('/') ? -1 : undefined)
  return SUBPATHS.has(subpath) ? '' : subpath
}

const Tabs = ({ location: { pathname, search }, match: { path: base } }) => {
  const subpath = getSubpath(pathname.slice(base.length))

  return (
    <div className={styles.tabs}>
      {TABS.map(({ path, label }) => (
        <NavLink
          exact
          key={label}
          to={{ pathname: base + path + subpath, search }}
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

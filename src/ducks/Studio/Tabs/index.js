import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styles from './index.module.scss'

const TABS = [
  {
    path: '',
    label: 'Studio'
  },
  {
    path: '/stats',
    label: 'Key Stats'
  },
  {
    path: '/related-insights',
    LabelComponent: ({ name }) =>
      name ? `Related ${name} Insights` : 'Related Insights'
  }
]

const SUBPATHS = new Set(TABS.map(({ path }) => path))

function getSubpath (path) {
  const slashPosition = path.lastIndexOf('/', path.length - 2)
  const subpath = path.slice(slashPosition, path.endsWith('/') ? -1 : undefined)
  return SUBPATHS.has(subpath) ? '' : subpath
}

const Tabs = ({
  location: { pathname },
  match: { path: base },
  settings: { name }
}) => {
  const subpath = getSubpath(pathname.slice(base.length))
  const search = window.location.search

  return (
    <div className={styles.tabs}>
      {TABS.map(({ path, label, LabelComponent }) => (
        <NavLink
          exact
          key={path}
          to={{ pathname: base + path + subpath, search }}
          className={styles.tab}
          activeClassName={styles.active}
        >
          {label || <LabelComponent name={name} />}
        </NavLink>
      ))}
    </div>
  )
}

export default withRouter(Tabs)

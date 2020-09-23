import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { NewLabelTemplate } from '../../../components/NewLabel/NewLabel'
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
    labelFormatter: name => (name ? `${name} Insights` : 'Insights')
  },
  {
    path: '/fees-distribution',
    label: (
      <>
        Fees Distribution
        <NewLabelTemplate className={styles.new} />
      </>
    ),
    checkVisibility: ({ slug }) => slug === 'ethereum'
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
  settings: { name, slug }
}) => {
  const subpath = getSubpath(pathname.slice(base.length))
  const search = window.location.search

  return (
    <div className={styles.tabs}>
      {TABS.map(({ path, label, labelFormatter, checkVisibility }) => {
        if (checkVisibility && !checkVisibility({ slug })) {
          return null
        }

        return (
          <NavLink
            exact
            key={path}
            to={{ pathname: base + path + subpath, search }}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {label || labelFormatter(name)}
          </NavLink>
        )
      })}
    </div>
  )
}

export default withRouter(Tabs)

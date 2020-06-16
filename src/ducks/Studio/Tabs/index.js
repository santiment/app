import React from 'react'
import cx from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import { getTemplateIdFromURL } from '../Template/utils'

const SUB_PATHS = {
  STATS: 'stats',
  STUDIO: ''
}

const tabs = [
  {
    index: '',
    label: 'Studio'
  },
  {
    index: SUB_PATHS.STATS,
    label: 'Key Stats'
  }
]

function getPreparedLink (root, index) {
  if (getTemplateIdFromURL()) {
    const parts = window.location.pathname.split('/')
    const templateUrl = parts[parts.length - 1]

    const indexPart = index ? '/' + index : ''
    return root + indexPart + '/' + templateUrl
  }

  return root + '/' + index
}

const Tabs = ({ root, location: { search } }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ index, label }) => {
        const to = getPreparedLink(root, index)
        return (
          <NavLink
            key={to}
            exact
            to={{ pathname: to, search }}
            activeClassName={styles.active}
            className={cx(styles.tab)}
          >
            {label}
          </NavLink>
        )
      })}
    </div>
  )
}

export default withRouter(Tabs)

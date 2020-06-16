import React from 'react'
import cx from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import styles from './index.module.scss'

const tabs = [
  {
    index: '',
    label: 'Studio'
  },
  {
    index: 'stats',
    label: 'Key Stats'
  }
]

const Tabs = ({ root, location: { search } }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ index, label }) => {
        const to = root + '/' + index
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

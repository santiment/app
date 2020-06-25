import React from 'react'
import cx from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import styles from './index.module.scss'

const tabs = [
  {
    index: '/studio',
    label: 'Studio',
  },
  {
    index: '/studio/stats',
    label: 'Key Stats',
  },
]

const Tabs = ({ location: { pathname, search } }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ index, label }) => (
        <Link
          key={index}
          to={{ pathname: index, search }}
          className={cx(styles.tab, pathname === index && styles.active)}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export default withRouter(Tabs)

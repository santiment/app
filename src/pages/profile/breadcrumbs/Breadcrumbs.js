import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import styles from './Breadcrumbs.module.scss'

const Breadcrumbs = ({ crumbs }) => {
  return (
    <div className={styles.breadcrumbs}>
      {crumbs.map(({ label, to = '#' }, index) => {
        const isLast = index === crumbs.length - 1
        return (
          <div key={label || to}>
            <Link to={to} className={cx(styles.root, isLast && styles.active)}>
              {label}
            </Link>
            {!isLast && <Icon type='arrow-right' className={styles.arrow} />}
          </div>
        )
      })}
    </div>
  )
}

export default Breadcrumbs

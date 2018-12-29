import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './FlatBtn.module.scss'

const FlatLinkBtn = ({ children, className = '', to, isActive, ...props }) => {
  return (
    <Link
      to={to}
      className={cx({
        [`${styles.button} ${className}`]: true,
        [styles.active]: isActive
      })}
      {...props}
    >
      {children}
    </Link>
  )
}

export default FlatLinkBtn

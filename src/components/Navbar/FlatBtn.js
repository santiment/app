import React from 'react'
import cx from 'classnames'
import styles from './FlatBtn.module.scss'

const FlatLinkBtn = ({ children, className = '', isActive, ...props }) => {
  return (
    <button
      className={cx({
        [`${styles.button} ${styles.btnReset} ${className}`]: true,
        [styles.active]: isActive
      })}
      {...props}
    >
      {children}
    </button>
  )
}

export default FlatLinkBtn

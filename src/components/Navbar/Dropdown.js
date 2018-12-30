import React from 'react'
import styles from './Dropdown.module.scss'

const Dropdown = ({ children, className = '', ...props }) => {
  return (
    <div className={`${styles.dropdown} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Dropdown

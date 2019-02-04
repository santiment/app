import React from 'react'
import styles from './Devider.module.scss'

const DropdownDevider = ({ ...props }) => {
  return <div {...props} className={styles.wrapper} />
}

export default DropdownDevider

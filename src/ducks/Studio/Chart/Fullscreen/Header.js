import React from 'react'
import Calendar from '../../Header/Calendar'
import ContextMenu from '../ContextMenu'
import styles from './index.module.scss'

const Header = ({ options, ...props }) => {
  return (
    <div className={styles.header}>
      <Calendar {...props} />
      <ContextMenu {...props} {...options} />
    </div>
  )
}

export default Header

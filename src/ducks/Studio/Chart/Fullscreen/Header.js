import React from 'react'
import Calendar from '../../Header/Calendar'
import ContextMenu from '../ContextMenu'
import styles from './index.module.scss'

const Header = ({ options, ...props }) => (
  <div className={styles.header}>
    <Calendar {...props} />
    <ContextMenu {...props} {...options} title={props.settings.title} />
  </div>
)

export default Header

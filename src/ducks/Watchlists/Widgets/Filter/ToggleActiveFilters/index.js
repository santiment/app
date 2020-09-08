import React from 'react'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './index.module.scss'

const ToggleActiveFilters = ({ isActive, onClick }) => (
  <div className={styles.wrapper} onClick={onClick}>
    <Toggle isActive={isActive} className={styles.toggle} />
    <span className={styles.text}>Show active filters only</span>
  </div>
)

export default ToggleActiveFilters

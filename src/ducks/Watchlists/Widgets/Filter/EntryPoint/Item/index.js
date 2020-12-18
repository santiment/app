import React from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './index.module.scss'

const Item = ({ name, key, isActive, onClick }) => {
  return (
    <div key={key} className={styles.item} onClick={onClick}>
      <Checkbox isActive={isActive} />
      <span className={styles.name}>{name}</span>
    </div>
  )
}

export default Item

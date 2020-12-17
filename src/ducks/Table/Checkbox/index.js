import React from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './index.module.scss'

const IndeterminateCheckbox = ({ title, onChange, checked }) => {
  return (
    <div className={styles.checkbox} onClick={onChange}>
      <Checkbox isActive={checked} />
    </div>
  )
}

export default IndeterminateCheckbox

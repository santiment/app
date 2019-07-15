import React from 'react'
import Button from '@santiment-network/ui/Button'
import styles from './Range.module.scss'

const Range = ({ label, range, changeRange }) => (
  <div className={styles.wrapper}>
    <h3 className={styles.label}>{label}</h3>
    <Button
      fluid
      variant='flat'
      isActive
      className={styles.button}
      onClick={changeRange}
    >
      {range}
    </Button>
  </div>
)

export default Range

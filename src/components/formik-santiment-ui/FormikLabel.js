import React from 'react'
import './FormikSelect.scss'
import Label from '@santiment-network/ui/Label'
import styles from './FormikLabel.module.scss'

const FormikLabel = ({ text = '\u00A0' }) => {
  return (
    <Label accent='waterloo' className={styles.label}>
      {text}
    </Label>
  )
}

export default FormikLabel

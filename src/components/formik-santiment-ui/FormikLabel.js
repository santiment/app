import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import styles from './FormikLabel.module.scss'

const FormikLabel = ({ text = '\u00A0', inner, className, onClick }) => {
  return (
    <Label
      accent='waterloo'
      onClick={onClick}
      className={cx(styles.label, inner && styles.inner, className)}
    >
      {text}
    </Label>
  )
}

export default FormikLabel

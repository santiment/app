import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import styles from './FormikLabel.module.scss'

const FormikLabel = ({ text = '\u00A0', inner }) => {
  return (
    <Label
      accent='waterloo'
      className={cx(styles.label, inner ? styles.inner : '')}
    >
      {text}
    </Label>
  )
}

export default FormikLabel

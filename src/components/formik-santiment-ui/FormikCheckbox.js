import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import { Field } from 'formik'
import FormikLabel from './FormikLabel'
import styles from './FormikCheckbox.module.scss'

const FormikCheckbox = props => {
  const { name } = props
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        return <CheckboxWrapper {...props} />
      }}
    />
  )
}

export const CheckboxWrapper = ({
  name,
  isActive,
  onClick,
  disabled,
  required,
  label,
  className
}) => {
  const clickHandler = !disabled ? onClick : null
  return (
    <div className={className}>
      <Checkbox
        className={styles.checkbox}
        disabled={disabled}
        isActive={isActive}
        name={name}
        onClick={clickHandler}
      />
      <FormikLabel
        text={label}
        className={cx(styles.checkboxLabel, required && styles.required)}
        onClick={clickHandler}
      />
    </div>
  )
}

export default FormikCheckbox

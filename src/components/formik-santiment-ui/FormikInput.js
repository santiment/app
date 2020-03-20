import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { Field, ErrorMessage } from 'formik'
import styles from './FormikInput.module.scss'

export const validateEmail = value => {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

const FormikInput = ({
  name,
  type,
  step = 'any',
  prefix,
  placeholder,
  disabled = false,
  onChange,
  min,
  max,
  validator,
  validate,
  el: El = Input,
  ...rest
}) => {
  return (
    <Field
      name={name}
      validate={validate}
      render={({ field, form }) => {
        const showPrefix = prefix && !!field.value

        return (
          <div className={styles.field}>
            {showPrefix && <span className={styles.prefix}>{prefix}</span>}
            <El
              className={cx(styles.input, showPrefix && styles.inputWithPrefix)}
              id={name}
              type={type}
              name={name}
              step={step}
              min={min}
              max={max}
              placeholder={placeholder}
              disabled={disabled}
              noValidate
              isError={validator ? !validator(field.value) : form.errors[name]}
              onChange={value => {
                const oldValue = value.target.value

                const newValue =
                  type === 'number' && oldValue.length > 0
                    ? parseFloat(oldValue)
                    : oldValue
                form.setFieldValue(name, newValue)
                form.setFieldTouched(name, true)
                onChange && onChange(newValue)
              }}
              value={field.value}
              {...rest}
            />
            <ErrorMessage name={name}>
              {msg => <div className='error error-message'>{msg}</div>}
            </ErrorMessage>
          </div>
        )
      }}
    />
  )
}

export default FormikInput

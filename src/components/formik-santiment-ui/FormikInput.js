import React from 'react'
import Input from '@santiment-network/ui/Input'
import { Field, ErrorMessage } from 'formik'
import styles from './FormikInput.module.scss'

const FormikInput = ({
  name,
  icon,
  type,
  step,
  prefix,
  placeholder,
  disabled = false,
  onChange,
  min,
  max,
  validator,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const showPrefix = prefix && !!field.value

        return (
          <div className={styles.field}>
            {showPrefix && <span className={styles.prefix}>{prefix}</span>}
            <Input
              className={showPrefix ? styles.inputWithPrefix : ''}
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

import React, { Fragment } from 'react'
import cx from 'classnames'
import { Field, ErrorMessage } from 'formik'
import AutoresizeTextarea from '../AutoresizeTextarea'
import styles from './FormikTextarea.module.scss'

const FormikTextarea = ({
  name,
  disabled = false,
  onChange,
  className,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isError = !!form.errors[name]
        return (
          <Fragment>
            <AutoresizeTextarea
              className={cx(
                styles.textarea,
                isError ? styles.error : '',
                className
              )}
              name={name}
              defaultValue={field.value}
              value={field.value}
              disabled={disabled}
              noValidate
              onChange={value => {
                form.setFieldValue(name, value)
                form.setFieldTouched(name, true)
                onChange && onChange(value)
              }}
              {...rest}
            />
            <ErrorMessage name={name}>
              {msg => <div className='error error-message'>{msg}</div>}
            </ErrorMessage>
          </Fragment>
        )
      }}
    />
  )
}

export default FormikTextarea

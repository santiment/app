import React, { Fragment } from 'react'
import { Input } from '@santiment-network/ui'
import { Field, ErrorMessage } from 'formik'

const FormikInput = ({
  name,
  type,
  step,
  placeholder,
  disabled = false,
  onChange,
  ...rest
}) => (
  <Field
    name={name}
    render={({ field, form }) => (
      <Fragment>
        {(() => {
          console.log(field.value)
        })()}
        <Input
          id={name}
          type={type}
          name={name}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          noValidate
          isError={!!form.errors[name]}
          onChange={value => {
            const newValue =
              type === 'number'
                ? parseFloat(value.target.value)
                : value.target.value
            form.setFieldValue(name, newValue)
            form.setFieldTouched(name, true)
            onChange && onChange(newValue)
          }}
          value={field.value || null}
          {...rest}
        />
        <ErrorMessage name={name}>
          {msg => <div className='error error-message'>{msg}</div>}
        </ErrorMessage>
      </Fragment>
    )}
  />
)

export default FormikInput

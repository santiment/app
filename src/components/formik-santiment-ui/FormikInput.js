import React, { Fragment } from 'react'
import Input from '@santiment-network/ui/Input'
import { Field, ErrorMessage } from 'formik'

const FormikInput = ({
  name,
  type,
  step,
  placeholder,
  disabled = false,
  onChange,
  min,
  max,
  ...rest
}) => (
  <Field
    name={name}
    render={({ field, form }) => (
      <Fragment>
        <Input
          id={name}
          type={type}
          name={name}
          step={step}
          min={min}
          max={max}
          placeholder={placeholder}
          disabled={disabled}
          noValidate
          isError={form.errors[name]}
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
      </Fragment>
    )}
  />
)

export default FormikInput

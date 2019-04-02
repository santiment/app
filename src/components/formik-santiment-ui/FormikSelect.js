import React from 'react'
import Select from 'react-select'
import { Field } from 'formik'
import './FormikSelect.scss'

const FormikSelect = ({
  options,
  name,
  disabled = false,
  placeholder,
  onChange,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => (
        <Select
          placeholder={placeholder}
          classNamePrefix='react-select'
          options={options}
          onChange={value => {
            form.setFieldValue(name, value)
            form.setFieldTouched(name, true)
            onChange && onChange(value)
          }}
          value={field.value}
          {...rest}
        />
      )}
    />
  )
}

export default FormikSelect

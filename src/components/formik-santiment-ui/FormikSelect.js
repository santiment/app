import React from 'react'
import { Select } from '@santiment-network/ui'
import { Field } from 'formik'

const FormikSelect = ({ options, name, disabled = false, placeholder }) => (
  <Field
    name={name}
    render={({ field, form }) => (
      <Select
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        onChange={value => {
          form.setFieldValue(name, value)
          form.setFieldTouched(name, true)
        }}
        value={field.value}
      />
    )}
  />
)

export default FormikSelect

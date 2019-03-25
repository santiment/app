import React from 'react'
import { Input } from '@santiment-network/ui'
import { Field } from 'formik'

const FormikInput = ({
  name,
  type = 'text',
  placeholder,
  values,
  errors,
  onBlur,
  onChange
}) => (
  <Field
    id={name}
    value={values[name]}
    type={type}
    name={name}
    placeholder={placeholder}
    isError={errors[name]}
    onChange={onChange}
    onBlur={onBlur}
    component={Input}
  />
)

export default FormikInput

import React from 'react'
import { Toggle } from '@santiment-network/ui'
import { Field } from 'formik'

const FormikToggle = ({
  options,
  disabledIndexes,
  name,
  disabled = false,
  styles
}) => (
  <Field
    name={name}
    render={({ field, form }) => (
      <Toggle
        onClick={() => {
          form.setFieldValue(name, !field.value)
          form.setFieldTouched(name, true)
        }}
        isActive={field.value}
      />
    )}
  />
)

export default FormikToggle

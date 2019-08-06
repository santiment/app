import React from 'react'
import Checkboxes from '@santiment-network/ui/Checkboxes/Checkboxes'
import { Field } from 'formik'

const FormikCheckboxes = ({
  options,
  disabledIndexes,
  name,
  labelOnRight,
  classes = {}
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        return (
          <Checkboxes
            labelOnRight={labelOnRight}
            options={options}
            disabledIndexes={disabledIndexes}
            defaultSelectedIndexes={field.value}
            onSelect={value => {
              const hasValue = field.value.some(el => el === value)
              const newData = hasValue
                ? field.value.filter(el => el !== value)
                : [...field.value, value]

              form.setFieldValue(name, newData)
              form.setFieldTouched(name, true)
            }}
            labelClassName={classes.checkboxLabel}
          />
        )
      }}
    />
  )
}

export default FormikCheckboxes

import React from 'react'
import { Checkboxes } from '@santiment-network/ui'
import { Field } from 'formik'

const FormikCheckboxes = ({
  options,
  disabledIndexes,
  name,
  labelOnRight,
  styles
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
              const newData = field.value.find(el => el === value)
                ? field.value.filter(el => el === name)
                : [...field.value, value]
              form.setFieldValue(name, newData)
              form.setFieldTouched(name, true)
            }}
            style={styles}
          />
        )
      }}
    />
  )
}

export default FormikCheckboxes

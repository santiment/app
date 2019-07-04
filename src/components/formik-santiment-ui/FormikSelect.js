import React, { Fragment } from 'react'
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
      render={({ field, form }) => {
        const isValid = !form.errors[name]
        const customStyles = {
          control: (base, state) => {
            return {
              ...base,
              borderColor: isValid ? '#ddd' : 'var(--persimmon) !important',
              '&:hover': {
                borderColor: isValid ? '#ddd' : 'var(--persimmon) !important'
              }
            }
          }
        }

        return (
          <Fragment>
            <Select
              styles={customStyles}
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
            {form.errors[name] && (
              <div className='error error-message'>{form.errors[name]}</div>
            )}
          </Fragment>
        )
      }}
    />
  )
}

export default FormikSelect

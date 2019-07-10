import React, { Fragment } from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
import './FormikSelect.scss'
import './FormikSelect.scss'

const FormikSelect = ({
  options,
  name,
  disabled = false,
  placeholder,
  onChange,
  isLoading = false,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isValid = !form.errors[name]
        const customStyles = {
          control: base => {
            const color = isValid ? '#ddd' : 'var(--persimmon) !important'
            return {
              ...base,
              borderColor: color,
              '&:hover': {
                borderColor: color
              }
            }
          }
        }

        return (
          <Fragment>
            <div className='react-select__container'>
              <Select
                disabled={disabled}
                styles={customStyles}
                placeholder={placeholder}
                classNamePrefix='react-select'
                options={options}
                isLoading={isLoading}
                valueKey='value'
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
            </div>
          </Fragment>
        )
      }}
    />
  )
}

export default FormikSelect

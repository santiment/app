import React, { Fragment } from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
import './FormikSelect.scss'

const FormikSelect = ({
  className,
  isClearable = true,
  options = [],
  name,
  multi = false,
  simpleValue = false,
  backspaceRemoves = false,
  componentType,
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
        return (
          <Fragment>
            <div
              className={
                multi ? 'select__container-multi' : 'select__container-single'
              }
            >
              <Select
                clearable={isClearable}
                className={className}
                selectComponent={componentType}
                multi={multi}
                simpleValue={simpleValue}
                placeholder={placeholder}
                classNamePrefix='react-select'
                options={options}
                isLoading={isLoading}
                valueKey='value'
                labelKey='label'
                backspaceRemoves={backspaceRemoves}
                minimumInput={1}
                onChange={value => {
                  form.setFieldValue(name, value)
                  form.setFieldTouched(name, true)
                  onChange && onChange(value)
                }}
                disabled={disabled}
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

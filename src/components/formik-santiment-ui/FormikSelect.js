import React, { Fragment } from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
import { Creatable } from 'react-select'
import './FormikSelect.scss'

const FormikSelect = ({
  className,
  isClearable = true,
  options = [],
  optionRenderer = undefined,
  name,
  multi = false,
  simpleValue = false,
  backspaceRemoves = false,
  isCreatable = false,
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
                optionRenderer={optionRenderer}
                clearable={isClearable}
                className={className}
                selectComponent={isCreatable ? Creatable : undefined}
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

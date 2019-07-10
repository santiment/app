import React, { Fragment, useState } from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
import './FormikSelect.scss'

const FormikSelect = ({
  className,
  options = [],
  name,
  multi = false,
  simpleValue = false,
  componentType,
  disabled = false,
  placeholder,
  onChange,
  isLoading = false,
  ...rest
}) => {
  /*
* {multi &&
              <Select
                labelKey='label'
                multi
                optionHeight={40}
                options={options}
                selectComponent={Creatable}
                simpleValue
                value={selectedCreatable}
                onChange={(selectedCreatable) => setSelected( selectedCreatable )}
                valueKey='value'
              />} */
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
                backspaceRemoves={false}
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

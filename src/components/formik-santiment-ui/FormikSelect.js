import React, { Fragment } from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
import { Creatable } from 'react-select'
import './FormikSelect.scss'

const FormikSelect = ({
  isClearable = true,
  name,
  multi = false,
  isCreatable = false,
  onChange,
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
                selectComponent={isCreatable ? Creatable : undefined}
                multi={multi}
                classNamePrefix='react-select'
                minimumInput={1}
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

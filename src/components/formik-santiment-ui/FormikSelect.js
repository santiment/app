import React from 'react'
import { connect } from 'react-redux'
import Select from '@santiment-network/ui/Search/Select/Select'
import { Field } from 'formik'
/* @GarageInc: pay attention, that creatable components works only with react-select 1.0.0 */
import { Creatable } from 'react-select'
import { showNotification } from '../../actions/rootActions'
import './FormikSelect.scss'

const FormikSelect = ({
  isClearable = true,
  name,
  multi = false,
  isCreatable = false,
  onChange,
  validator,
  notificationText,
  showErrorNotification,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        return (
          <>
            <Select
              maxHeight={330}
              clearable={isClearable}
              selectComponent={isCreatable ? Creatable : undefined}
              multi={multi}
              classNamePrefix='react-select'
              minimumInput={1}
              onChange={value => {
                const isValid = !validator || validator(value)
                const newValue = isValid ? value : field.value
                form.setFieldValue(name, newValue)
                onChange && onChange(newValue)

                if (!isValid && notificationText) {
                  showErrorNotification(notificationText)
                }
              }}
              value={field.value}
              {...rest}
            />
            {form.errors[name] && (
              <div className='error error-message'>{form.errors[name]}</div>
            )}
          </>
        )
      }}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  showErrorNotification: text => {
    dispatch(
      showNotification({
        variant: 'error',
        title: text
      })
    )
  }
})
export default connect(
  null,
  mapDispatchToProps
)(FormikSelect)

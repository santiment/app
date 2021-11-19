import React from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'

const ConditionSelect = ({
  isClearable = true,
  multi = false,
  isCreatable = false,
  onChange,
  validator,
  notificationText,
  showErrorNotification,
  handleFormValueChange,
  value,
  ...rest
}) => (
  <Select
    maxHeight={330}
    clearable={isClearable}
    multi={multi}
    classNamePrefix='react-select'
    minimumInput={1}
    onChange={handleFormValueChange}
    value={value}
    {...rest}
  />
)

export default ConditionSelect

import React from 'react'
import LibSelect from 'react-virtualized-select'
import './Select.module.scss'

const Select = ({ ...props }) => {
  return <LibSelect {...props} optionHeight={32} />
}

export default Select

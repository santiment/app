import React from 'react'
import { components } from 'react-select'
import { formatOptionLabel } from '../utils'

const OperationValue = props => (
  <components.SingleValue {...props}>
    {formatOptionLabel(props.data)}
  </components.SingleValue>
)

export default OperationValue

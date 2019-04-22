import React from 'react'
import ValueChange from './ValueChange/ValueChange'

const render = change => `${parseFloat(change).toFixed(2)}%`

const PercentChanges = ({ className, changes, label }) => (
  <ValueChange
    className={className}
    change={changes}
    render={render}
    label={label}
  />
)

export default PercentChanges

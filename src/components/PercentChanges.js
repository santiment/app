import React from 'react'
import ValueChange from './ValueChange/ValueChange'

const render = change =>
  `${parseFloat(change).toFixed(Math.abs(change) >= 100 ? 0 : 2)}%`

const PercentChanges = ({ className, changes }) => (
  <ValueChange className={className} change={changes} render={render} />
)

export default PercentChanges

import React from 'react'
import ValueChange from './ValueChange/ValueChange'
import { millify } from '../utils/formatting'

function render (change) {
  const isMillify = Math.abs(change) > 1000
  const withFloatPart = Math.abs(change) < 100
  return `${
    isMillify
      ? millify(change, 0)
      : parseFloat(change).toFixed(withFloatPart ? 2 : 0)
  }%`
}

const PercentChanges = ({ className, changes }) => (
  <ValueChange className={className} change={changes} render={render} />
)

export default PercentChanges

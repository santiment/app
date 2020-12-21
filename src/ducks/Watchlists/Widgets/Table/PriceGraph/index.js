import React from 'react'
import { sortByAsDates } from '../../../../../utils/sortMethods'
import ChangeChart from './ChangeChart'

const PriceGraph = ({ data = [], className, width = 90 }) => {
  if (!data || data.length < 10) {
    return null
  }

  const clearData = data
    .filter(({ value }) => Boolean(value))
    .sort(sortByAsDates('datetime'))
    .reverse()

  if (clearData.length < 10) {
    return null
  }

  return (
    <div className={className}>
      <ChangeChart data={clearData} width={width} />
    </div>
  )
}

export default PriceGraph

import { useState, useEffect, useMemo } from 'react'
import { METRICS_AMOUNT, MATRIX_SIZE } from './matrix'
import { FLOW_QUERY, DAYS_AMOUNT } from './query'
import { client } from '../../../../apollo'

const DEFAULT_STATE = []
const EMPTY = new Array(DAYS_AMOUNT).fill(0)

const valueAccessor = ({ value }) => value

function dataAccessor ({ data }) {
  const result = new Array(METRICS_AMOUNT)

  for (let i = 0; i < METRICS_AMOUNT; i++) {
    const period = data['_' + i]
    result[i] = period ? period.timeseriesData.map(valueAccessor) : EMPTY
  }

  return result
}

const getPeriodFlow = variables =>
  client
    .query({
      query: FLOW_QUERY,
      variables
    })
    .then(dataAccessor)

export function usePeriodMatrix (slug) {
  const [matrix, setMatrix] = useState(DEFAULT_STATE)

  useEffect(
    () => {
      getPeriodFlow({ slug })
        .then(data => {
          const result = new Array(MATRIX_SIZE)
          for (let i = 0, y = 0; i < MATRIX_SIZE; i++, y += MATRIX_SIZE) {
            result[i] = data.slice(y, y + MATRIX_SIZE)
          }
          console.log(result)
          return result
        })
        .then(setMatrix)
    },
    [slug]
  )

  return matrix
}

export const useDayMatrix = (periodMatrix, dayIndex = 0) =>
  useMemo(
    () => periodMatrix.map(periods => periods.map(values => values[dayIndex])),
    [periodMatrix, dayIndex]
  )

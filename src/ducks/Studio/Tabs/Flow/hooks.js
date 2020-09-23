import { useState, useEffect, useMemo } from 'react'
import { METRICS_AMOUNT, MATRIX_SIZE } from './matrix'
import { FLOW_QUERY } from './query'
import { client } from '../../../../apollo'

const DEFAULT_STATE = []

const valueAccessor = ({ value }) => value
const buildDataAccessor = emptyValues => ({ data }) => {
  const result = new Array(METRICS_AMOUNT)

  for (let i = 0; i < METRICS_AMOUNT; i++) {
    const period = data['_' + i]
    result[i] = period ? period.timeseriesData.map(valueAccessor) : emptyValues
  }

  return result
}

const getPeriodFlow = (variables, emptyValues) =>
  client
    .query({
      query: FLOW_QUERY,
      variables
    })
    .then(buildDataAccessor(emptyValues))

export function usePeriodMatrix (slug, [from, to], daysAmount) {
  const [matrix, setMatrix] = useState(DEFAULT_STATE)

  useEffect(
    () => {
      const emptyValues = new Array(daysAmount).fill(0)

      getPeriodFlow(
        { slug, from: from.toISOString(), to: to.toISOString() },
        emptyValues
      )
        .then(data => {
          const result = new Array(MATRIX_SIZE)

          for (let i = 0, y = 0; i < MATRIX_SIZE; i++, y += MATRIX_SIZE) {
            result[i] = data.slice(y, y + MATRIX_SIZE)
          }

          return result
        })
        .then(setMatrix)
    },
    [slug, from, to]
  )

  return matrix
}

export const useDayMatrix = (periodMatrix, dayIndex = 0) =>
  useMemo(
    () => periodMatrix.map(periods => periods.map(values => values[dayIndex])),
    [periodMatrix, dayIndex]
  )

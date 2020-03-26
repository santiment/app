import { useState, useEffect } from 'react'
import { linearScale } from '@santiment-network/chart/scales'
import { useQuery } from '@apollo/react-hooks'
import { HISTOGRAM_DATA_QUERY } from './gql'

const Chart = {
  height: 342,
  top: 0
}

function formatHistogramData (data) {
  const { length } = data

  let max = 0

  for (let i = 0; i < length; i++) {
    const { value } = data[i]
    if (value > max) {
      max = value
    }
  }

  const scaler = linearScale(Chart, max, 0)

  return data.map((distribution, index) => {
    return {
      index,
      distribution,
      width: scaler(distribution.value)
    }
  })
}

export function useHistogramData ({ slug, from, to }) {
  const [histogramData, setHistogramData] = useState([])
  const { data, loading, error } = useQuery(HISTOGRAM_DATA_QUERY, {
    skip: !from || !to,
    variables: {
      slug,
      from,
      to
    }
  })

  useEffect(
    () => {
      if (data) {
        setHistogramData(
          formatHistogramData(data.getMetric.histogramData.values.data)
        )
      }
    },
    [data]
  )

  return [histogramData, loading, error]
}

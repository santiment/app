import { useState, useEffect } from 'react'
import { logScale } from '@santiment-network/chart/scales'
import { useQuery } from '@apollo/react-hooks'
import { HISTOGRAM_DATA_QUERY } from './gql'

const Chart = {
  height: 50,
  top: 0,
  bottom: 50
}

function formatHistogramData (data, price) {
  const { length } = data

  let max = 1

  for (let i = 0; i < length; i++) {
    const { value } = data[i]
    if (value > max) {
      max = value
    }
  }

  const scaler = logScale(Chart, max, 1)
  let isPriceRangeFound = false

  return data
    .map((distribution, index) => {
      const { range, value } = distribution
      const isCurrentPriceInRange =
        !isPriceRangeFound && price > range[0] && price < range[1]

      if (isCurrentPriceInRange) {
        isPriceRangeFound = true
      }

      return {
        index,
        distribution,
        width: scaler(value) + 'px',
        price: isCurrentPriceInRange && price,
        isRangeAfterCurrentPrice: isPriceRangeFound && !isCurrentPriceInRange
      }
    })
    .reverse()
}

export function usePriceHistogramData ({ slug, from, to }) {
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
          formatHistogramData(
            data.histogramQuery.histogramData.values.data,
            data.priceQuery.price
          )
        )
      }
    },
    [data]
  )

  return [histogramData, loading, error]
}

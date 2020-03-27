import { useState, useEffect } from 'react'
import { linearScale } from '@santiment-network/chart/scales'
import { useQuery } from '@apollo/react-hooks'
import { HISTOGRAM_DATA_QUERY, PROJECT_PRICE_QUERY } from './gql'

const Chart = {
  height: 50,
  top: 0
}

function formatHistogramData (data, price) {
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
    const { range, value } = distribution
    const isCurrentPriceInBucket = price > range[0] && price < range[1]
    return {
      index,
      distribution,
      width: scaler(value) + 'px',
      price: isCurrentPriceInBucket && price
    }
  })
}

export function useHistogramData ({ slug, from, to }) {
  const [histogramData, setHistogramData] = useState([])
  const { data: priceData } = useQuery(PROJECT_PRICE_QUERY, {
    variables: {
      slug
    }
  })
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
      const currentPrice = priceData ? priceData.project.priceUsd : 0
      if (data) {
        setHistogramData(
          formatHistogramData(
            data.getMetric.histogramData.values.data,
            currentPrice
          )
        )
      }
    },
    [data, priceData]
  )

  return [histogramData, loading, error]
}

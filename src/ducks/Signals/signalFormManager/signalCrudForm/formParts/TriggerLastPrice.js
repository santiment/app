import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { formatNumber } from '../../../../../utils/formatting'
import styles from './../signal/TriggerForm.module.scss'

const LAST_PRICE_QUERY = gql`
  query getMetric($slug: String!) {
    getMetric(metric: "price_usd") {
      timeseriesData(slug: $slug, from: "utc_now-1d", to: "utc_now") {
        value
        datetime
      }
    }
  }
`

const useLastPrice = slugTitle => {
  const { data, loading } = useQuery(LAST_PRICE_QUERY, {
    variables: {
      slug: slugTitle
    },
    skip: !slugTitle
  })

  const value = useMemo(
    () => {
      if (data && data.getMetric.timeseriesData[0]) {
        return data.getMetric.timeseriesData[0].value
      }

      return 0
    },
    [data]
  )

  return {
    value,
    loading
  }
}

export const LastPriceComponent = ({ slugTitle }) => {
  const { value, loading } = useLastPrice(slugTitle)

  if (loading) {
    return null
  }

  if (!slugTitle || !value) {
    return null
  }

  return (
    <div className={styles.lastPrice}>
      1 {slugTitle.toUpperCase()} = {formatNumber(value, { currency: 'USD' })}
    </div>
  )
}

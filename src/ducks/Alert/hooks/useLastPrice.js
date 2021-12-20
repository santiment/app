import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { LAST_PRICE_QUERY } from './queries'

export const useLastPrice = slugTitle => {
  const { data, loading } = useQuery(LAST_PRICE_QUERY, {
    variables: {
      slug: slugTitle
    },
    skip: !slugTitle || typeof slugTitle !== 'string'
  })

  const value = useMemo(() => {
    if (data && data.getMetric.timeseriesData[0]) {
      return data.getMetric.timeseriesData[0].value
    }

    return 0
  }, [data])

  return {
    data: value,
    loading
  }
}

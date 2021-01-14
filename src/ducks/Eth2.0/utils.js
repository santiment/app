import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'

export const useEthPieChart = QUERY => {
  const { data, loading, error } = useQuery(QUERY)

  return useMemo(
    () => {
      return {
        data: data ? data.getMetric.histogramData.values.data : [],
        loading,
        error
      }
    },
    [data, loading, error]
  )
}

import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'

export const useEthPieChart = (QUERY, settings) => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: settings
  })

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

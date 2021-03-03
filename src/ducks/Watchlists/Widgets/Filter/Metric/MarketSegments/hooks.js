import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { sortBy } from '../../../../../../utils/sortMethods'

const ARRAY = []
const SORTER = sortBy('count')

const AVAILABLE_SEGMENTS_QUERY = gql`
  query allMarketSegments {
    allMarketSegments {
      count
      name
    }
  }
`

export function useAvailableSegments () {
  const { data, loading } = useQuery(AVAILABLE_SEGMENTS_QUERY)

  return useMemo(
    () => [data ? data.allMarketSegments.sort(SORTER) : ARRAY, loading],
    [data]
  )
}

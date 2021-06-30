import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ACTIVE_WIDGETS_QUERY = gql`
  query {
    activeWidgets {
      title
      description
      videoLink
      imageLink
      createdAt
    }
  }
`
const ARR = []

export const useActiveWebinars = () => {
  const { data, loading } = useQuery(ACTIVE_WIDGETS_QUERY)
  return useMemo(
    () => ({
      activeWidgets: data ? data.activeWidgets : ARR,
      loading
    }),
    [data, loading]
  )
}

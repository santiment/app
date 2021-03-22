import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const TOP_HOLDERS_QUERY = gql`
  query topHolders(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $count: Int!
  ) {
    topHolders(slug: $slug, from: $from, to: $to, numberOfHolders: $count) {
      address
      value
      valueUsd
      labels {
        metadata
        name
      }
      partOfTotal
    }
  }
`

export const useTopHolders = ({ from, to, count, slug }) => {
  const query = useQuery(TOP_HOLDERS_QUERY, {
    variables: { from, to, count, slug }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query

      return [data ? data.topHolders : [], loading, error]
    },
    [query]
  )
}

import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
const TOP_HOLDERS_QUERY = gql`
  query topHolders($slug: String!, $from: DateTime!, $to: DateTime!, $page: Int!, $pageSize: Int!) {
    topHolders(slug: $slug, from: $from, to: $to, page: $page, pageSize: $pageSize) {
      address
      value
      valueUsd
      labels {
        metadata
        name
        __typename
      }
      partOfTotal
      __typename
    }
  }
`
const TOP_HOLDERS_COUNT_QUERY = gql`
  query topHolders($slug: String!, $from: DateTime!, $to: DateTime!) {
    topHolders(slug: $slug, from: $from, to: $to, page: 1, pageSize: 99999999) {
      __typename
    }
  }
`
export const useTopHolders = ({ from, to, page, pageSize, slug, labels }) => {
  const query = useQuery(TOP_HOLDERS_QUERY, {
    variables: {
      from,
      to,
      page,
      pageSize,
      slug,
      labels,
    },
  })
  return useMemo(() => {
    const { data, loading, error } = query

    if (data && data.topHolders) {
      data.topHolders.forEach((holder) => {
        const order = new Set([
          'centralized exchange',
          'fund',
          'decentralized exchange',
          'team wallet',
        ])

        const checkIsOwner = (v) => v.metadata.includes('owner')
        const checkIsStatic = (v) => order.has(v.name.toLowerCase())

        holder.labels.sort((a, b) => {
          if (checkIsOwner(a)) return -1
          if (checkIsOwner(b)) return 1

          if (checkIsStatic(a)) return -1
          if (checkIsStatic(b)) return 1

          return 0
        })
      })
    }

    return [data ? data.topHolders : [], loading, error]
  }, [query])
}
export const useMaxCountTopHolders = ({ from, to, slug, labels }) => {
  const query = useQuery(TOP_HOLDERS_COUNT_QUERY, {
    variables: {
      from,
      to,
      slug,
      labels,
    },
  })
  return useMemo(() => {
    const { data, loading, error } = query
    return [data ? data.topHolders.length : 0, loading, error]
  }, [query])
}

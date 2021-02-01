import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useUser } from '../../../../../../stores/user'
import { sortBy } from '../../../../../../utils/sortMethods'

const EMPTY_ARRAY = []
const SORTER = sortBy('id')

export const FEATURED_TABLE_CONFIGS_QUERY = gql`
  query featuredTableConfigurations {
    featuredTableConfigurations {
      id
      title
    }
  }
`

export const TABLE_CONFIGS_QUERY = gql`
  query tableConfigurations {
    tableConfigurations {
      id
      title
      user {
        id
      }
    }
  }
`
export const TABLE_CONFIG_QUERY = gql`
  query tableConfiguration($id: Int!) {
    tableConfiguration(id: $id) {
      id
      title
      columns
    }
  }
`

export function useFeaturedTableConfigs () {
  const { data } = useQuery(FEATURED_TABLE_CONFIGS_QUERY)
  return useMemo(
    () => {
      return data
        ? data.featuredTableConfigurations.slice().sort(SORTER)
        : EMPTY_ARRAY
    },
    [data]
  )
}

export function useUserTableConfigs () {
  const {
    user: { id }
  } = useUser()
  const { data } = useQuery(TABLE_CONFIGS_QUERY)
  return useMemo(
    () => {
      return data
        ? data.tableConfigurations
          .slice()
          .filter(item => item.user.id === id)
          .sort(SORTER)
        : EMPTY_ARRAY
    },
    [data]
  )
}

export function useTableConfig (id) {
  const { data, loading, error } = useQuery(TABLE_CONFIG_QUERY, {
    variables: { id }
  })
  return { tableConfig: data && data.tableConfiguration, loading, error }
}

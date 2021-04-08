import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useUser } from '../../../../../../stores/user'
import { sortBy } from '../../../../../../utils/sortMethods'
import { BLOCKCHAIN_ADDRESS } from '../../../../detector'

const EMPTY_ARRAY = []
const EMPTY_OBJ = {}
const SORTER = sortBy('id')

export const TABLE_CONFIGS_QUERY = gql`
  query tableConfigurations($userId: Int) {
    tableConfigurations(userId: $userId) {
      id
      title
      user {
        id
      }
    }
  }
`

const FEATURED_TABLE_CONFIGS_QUERY = gql`
  query featuredTableConfigurations {
    featuredTableConfigurations {
      id
      title
    }
  }
`

const TABLE_CONFIG_QUERY = gql`
  query tableConfiguration($id: Int!) {
    tableConfiguration(id: $id) {
      id
      title
      columns
    }
  }
`

const ACCESS_RESTRICTIONS_QUERY = gql`
  query getAccessRestrictions {
    getAccessRestrictions {
      name
      type
      isRestricted
    }
  }
`

export function useFeaturedTableConfigs () {
  const { data } = useQuery(FEATURED_TABLE_CONFIGS_QUERY)
  return useMemo(
    () =>
      data
        ? data.featuredTableConfigurations.slice().sort(SORTER)
        : EMPTY_ARRAY,
    [data]
  )
}

export function useUserTableConfigs () {
  const { user } = useUser()
  const { id } = user || EMPTY_OBJ
  const { data } = useQuery(TABLE_CONFIGS_QUERY, {
    skip: !id,
    variables: {
      userId: +id
    }
  })
  return useMemo(
    () => (data ? data.tableConfigurations.slice().sort(SORTER) : EMPTY_ARRAY),
    [data]
  )
}

export function useTableConfig (id) {
  const { data, loading, error } = useQuery(TABLE_CONFIG_QUERY, {
    skip: !id,
    variables: { id }
  })
  return { tableConfig: data && data.tableConfiguration, loading, error }
}

export function useRestrictedMetrics (type) {
  const { data, loading } = useQuery(ACCESS_RESTRICTIONS_QUERY, {
    skip: type === BLOCKCHAIN_ADDRESS
  })

  return useMemo(
    () => {
      if (data && data.getAccessRestrictions) {
        const allMetrics = []
        const restrictedMetrics = []

        data.getAccessRestrictions.forEach(({ name, type, isRestricted }) => {
          allMetrics.push(name)
          if (type === 'metric' && isRestricted) {
            restrictedMetrics.push(name)
          }
        })
        return { restrictedMetrics, allMetrics, loading }
      } else {
        return {
          restrictedMetrics: EMPTY_ARRAY,
          allMetrics: EMPTY_ARRAY,
          loading
        }
      }
    },
    [data]
  )
}

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY,
  PROJECT_BY_ID_QUERY,
  PROJECT_WITH_SLUG_QUERY
} from '../ducks/Watchlists/gql/allProjectsGQL'
import { useMemo } from 'react'

export function useProjectById (id) {
  const { data, loading, error } = useQuery(PROJECT_BY_ID_QUERY, {
    skip: !id,
    variables: {
      id
    }
  })

  return [data ? data.project : undefined, loading, error]
}

export function useProject (slug) {
  const { data, loading, error } = useQuery(PROJECT_WITH_SLUG_QUERY, {
    skip: !slug,
    variables: {
      slug
    }
  })

  return [data ? data.projectBySlug : undefined, loading, error]
}

const makeFn = ({ limit, listId, orderBy }) => {
  return JSON.stringify({
    args: {
      pagination: {
        page: 1,
        pageSize: limit
      },
      baseProjects: [
        {
          watchlistId: listId
        }
      ],
      orderBy: orderBy
    },
    name: 'selector'
  })
}

export function useProjectsSocialVolumeChanges ({
  listId,
  orderBy,
  limit = 100
}) {
  const query = useQuery(ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY, {
    variables: {
      fn: makeFn({ listId, limit, orderBy })
    }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query
      const items = data ? data.allProjectsByFunction.projects : []

      return [items, loading, error]
    },
    [query]
  )
}

const buildQuery = ({ metric, interval }) => gql`
  query allProjectsByFunction($fn: json) {
    allProjectsByFunction(function: $fn) {
      projects {
        slug
        ticker
        name
        ${metric}: aggregatedTimeseriesData(
          metric: "${metric}"
          from: "utc_now-${interval}"
          to: "utc_now"
          aggregation: LAST
        )
        marketcapUsd
        priceUsd
      }
    }
  }
`

export function useProjectPriceChanges ({
  metric,
  interval,
  listId,
  orderBy,
  limit = 100
}) {
  const gqlQuery = buildQuery({ metric, interval })
  const query = useQuery(gqlQuery, {
    variables: {
      fn: makeFn({ listId, limit, orderBy })
    }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query
      const items = data ? data.allProjectsByFunction.projects : []

      return [items, loading, error]
    },
    [query]
  )
}

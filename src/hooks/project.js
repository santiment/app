import { useQuery } from '@apollo/react-hooks'
import {
  ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY,
  buildInfographicQuery,
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

function getLimit (updatedAt) {
  // GarageInc | 6.04.2021: updating list of items/infographics after updating of watchlist/screener
  return new Date(updatedAt).getTime()
}

export function useProjectsSocialVolumeChanges ({ listId, orderBy, updatedAt }) {
  const query = useQuery(ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY, {
    variables: {
      fn: makeFn({ listId, limit: getLimit(updatedAt), orderBy })
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

export function useProjectPriceChanges ({
  metric,
  interval,
  listId,
  orderBy,
  updatedAt
}) {
  const gqlQuery = buildInfographicQuery({ metric, interval })
  const query = useQuery(gqlQuery, {
    variables: {
      fn: makeFn({ listId, limit: getLimit(updatedAt), orderBy })
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

import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  ALL_PROJECTS_FOR_SEARCH_QUERY,
  ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY,
  buildInfographicQuery,
  PROJECT_BY_ID_QUERY,
  PROJECT_WITH_SLUG_QUERY,
} from '../ducks/Watchlists/gql/allProjectsGQL'
import { useUser } from '../stores/user'

export function useAssets({ shouldSkipLoggedInState = false }) {
  const { isLoggedIn } = useUser()
  const query = useQuery(ALL_PROJECTS_FOR_SEARCH_QUERY, {
    skip: shouldSkipLoggedInState ? false : !isLoggedIn,
    variables: {
      minVolume: 0,
    },
    context: {
      isRetriable: true,
    },
  })

  return useMemo(() => {
    const { data, loading, error } = query
    const items = data ? data.allProjects : []

    return [items, loading, error]
  }, [query])
}

export function useProjectById(id) {
  const { data, loading, error } = useQuery(PROJECT_BY_ID_QUERY, {
    skip: !id,
    variables: {
      id,
    },
  })

  return [data ? data.project : undefined, loading, error]
}

export function useProject(slug) {
  const { data, loading, error } = useQuery(PROJECT_WITH_SLUG_QUERY, {
    skip: !slug || typeof slug !== 'string',
    variables: {
      slug,
    },
  })

  return [data ? data.projectBySlug : undefined, loading, error]
}

const makeFn = ({ limit, slugs, orderBy }) => {
  return JSON.stringify({
    args: {
      pagination: {
        page: 1,
        pageSize: limit,
      },
      baseProjects: [
        {
          slugs,
        },
      ],
      orderBy: orderBy,
    },
    name: 'selector',
  })
}

function getLimit() {
  return 100
}

export function useProjectsSocialVolumeChanges({ orderBy, slugs }) {
  const query = useQuery(ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY, {
    variables: {
      fn: makeFn({ slugs, limit: getLimit(), orderBy }),
    },
  })

  return useMemo(() => {
    const { data, loading, error } = query
    const items = data ? data.allProjectsByFunction.projects : []

    return [items, loading, error]
  }, [query])
}

export function useProjectPriceChanges({ metric, interval, orderBy, slugs }) {
  const gqlQuery = buildInfographicQuery({ metric, interval })
  const query = useQuery(gqlQuery, {
    variables: {
      fn: makeFn({ slugs, limit: getLimit(), orderBy }),
    },
  })

  return useMemo(() => {
    const { data, loading, error } = query
    const items = data ? data.allProjectsByFunction.projects : []

    return [items, loading, error]
  }, [query])
}

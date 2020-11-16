import { useQuery } from '@apollo/react-hooks'
import {
  ALL_PROJECTS_PRICE_CHANGES_QUERY,
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

const prepare = ({ items, limit, sorter, key }) =>
  items
    .sort(sorter)
    .slice(0, limit)
    .map(item => ({
      ...item,
      [key]: +item[key]
    }))

export function useProjectPriceChanges ({ key, assets, sorter, limit = 100 }) {
  const query = useQuery(ALL_PROJECTS_PRICE_CHANGES_QUERY, {
    variables: {
      fn: JSON.stringify({
        args: {
          slugs: assets
        },
        name: 'slugs'
      })
    }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query
      const items = data ? data.allProjectsByFunction.projects : []

      const mapped = prepare({ items, limit, sorter, key })

      return [mapped, loading, error]
    },
    [query]
  )
}

export function useProjectsSocialVolumeChanges ({
  interval,
  assets,
  sorter,
  limit = 100
}) {
  const query = useQuery(ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY, {
    variables: {
      fn: JSON.stringify({
        args: {
          slugs: assets
        },
        name: 'slugs'
      })
    }
  })

  return useMemo(() => {
    const { data, loading, error } = query
    const items = data ? data.allProjectsByFunction.projects : []

    const key = `change${interval}`

    const mapped = prepare({ items, limit, sorter, key })

    return [mapped, loading, error]
  }, [])
}

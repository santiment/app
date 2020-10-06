import { useQuery } from '@apollo/react-hooks'
import {
  ALL_PROJECTS_PRICE_CHANGES_QUERY,
  ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY,
  PROJECT_BY_ID_QUERY,
  PROJECT_WITH_SLUG_QUERY
} from '../ducks/Watchlists/gql/allProjectsGQL'

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

const prepare = ({ items, mapAssets, limit, sorter, key }) =>
  items
    .filter(item => {
      const { slug } = item
      return mapAssets[slug]
    })
    .sort(sorter)
    .slice(0, limit)
    .map(item => ({
      ...item,
      [key]: +item[key]
    }))

export function useProjectPriceChanges ({
  key,
  mapAssets,
  sorter,
  limit = 100
}) {
  const { data, loading, error } = useQuery(ALL_PROJECTS_PRICE_CHANGES_QUERY)

  const items = data ? data.allProjects : []

  const mapped = prepare({ items, mapAssets, limit, sorter, key })

  return [mapped, loading, error]
}

export function useProjectsSocialVolumeChanges ({
  interval,
  mapAssets,
  sorter,
  limit = 100
}) {
  const { data, loading, error } = useQuery(
    ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY
  )

  const items = data ? data.allProjects : []

  const key = `change${interval}`

  const mapped = prepare({ items, mapAssets, limit, sorter, key })

  return [mapped, loading, error]
}

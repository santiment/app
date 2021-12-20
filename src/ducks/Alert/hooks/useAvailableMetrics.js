import { useQuery } from '@apollo/react-hooks'
import {
  DEFAULT_METRICS,
  PROJECT_METRICS_BY_SLUG_QUERY
} from '../../Studio/withMetrics'

export function useAvailableMetrics (slug) {
  const { data, loading, error } = useQuery(PROJECT_METRICS_BY_SLUG_QUERY, {
    skip: !slug || typeof slug !== 'string',
    variables: {
      slug
    }
  })

  const projectData = data
    ? data.project
    : {
        availableMetrics: DEFAULT_METRICS
      }

  return {
    data: projectData,
    loading,
    error
  }
}

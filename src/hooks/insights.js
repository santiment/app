import { useQuery } from '@apollo/react-hooks'
import { ALL_INSIGHTS_QUERY } from '../queries/InsightsGQL'

export const DEFAULT_INSIGHTS_PER_PAGE = 10

export const useInsightsByTag = ({
  tags,
  page,
  pageSize = DEFAULT_INSIGHTS_PER_PAGE
} = {}) => {
  const { data = {}, loading, error } = useQuery(ALL_INSIGHTS_QUERY, {
    variables: {
      tags,
      page,
      pageSize
    }
  })

  const insighs = data ? data.insights : []

  return {
    data: insighs || [],
    loading,
    error
  }
}

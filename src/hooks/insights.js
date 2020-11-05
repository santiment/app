import { useQuery } from '@apollo/react-hooks'

export const DEFAULT_INSIGHTS_PER_PAGE = 10

export const useInsightsBy = (variables, query) => {
  const { data = {}, loading, error } = useQuery(query, {
    variables
  })

  const insighs = data ? data.insights : []

  return {
    data: insighs || [],
    loading,
    error
  }
}

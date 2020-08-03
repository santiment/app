import { useQuery } from '@apollo/react-hooks'
import {
  ALL_INSIGHTS_BY_PAGE_QUERY,
  ALL_INSIGHTS_QUERY
} from '../queries/InsightsGQL'

export const useInsighgsByTag = ({ tag } = {}) => {
  const { data = {}, loading, error } = useQuery(ALL_INSIGHTS_QUERY, {
    skip: !tag,
    variables: {
      tag
    }
  })

  const insighs = data ? data.allInsightsByTag : []

  return {
    data: insighs || [],
    loading,
    error
  }
}

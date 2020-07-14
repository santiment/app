import { useQuery } from '@apollo/react-hooks'
import { FEATURED_USER_TRIGGERS_QUERY } from './queries'

export function useFeaturedUserTriggers () {
  const { data, loading, error } = useQuery(FEATURED_USER_TRIGGERS_QUERY)
  return [data ? data.featuredUserTriggers : [], loading, error]
}

import { useQuery } from '@apollo/react-hooks'
import { WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'

export function useWatchlist (id) {
  const { data, loading, error } = useQuery(WATCHLIST_QUERY, {
    skip: !id,
    variables: {
      id: +id
    }
  })

  return [data ? data.watchlist : undefined, loading, error]
}

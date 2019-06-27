import getEnhancedWatchlist from './getEnhancedWatchlist'
import { ALL_WATCHLISTS_QUERY } from '../../queries/WatchlistGQL'

export default getEnhancedWatchlist({
  query: ALL_WATCHLISTS_QUERY,
  name: 'fetchUserLists',
  requiresAuth: true
})

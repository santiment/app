import getEnhancedWatchlist from './getEnhancedWatchlist'
import { ALL_WATCHLISTS_QUERY } from './../../components/WatchlistPopup/WatchlistGQL'

export default getEnhancedWatchlist({
  query: ALL_WATCHLISTS_QUERY,
  name: 'fetchUserLists',
  requiresAuth: true
})

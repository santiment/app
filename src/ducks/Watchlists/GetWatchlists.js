import getEnhancedWatchlist from './getEnhancedWatchlist'
import { allWatchlistsGQL } from './../../components/WatchlistPopup/WatchlistGQL'

export default getEnhancedWatchlist({
  query: allWatchlistsGQL,
  name: 'fetchUserLists',
  requiresAuth: true
})

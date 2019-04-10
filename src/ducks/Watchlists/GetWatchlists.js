import getEnhancedWatchlist from './getEnhancedWatchlist'
import { WatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'

export default getEnhancedWatchlist({
  query: WatchlistGQL,
  name: 'fetchUserLists',
  requiresAuth: true
})

import getEnhancedWatchlist from './getEnhancedWatchlist'
import { FEATURED_WATCHLIST_QUERY } from './../../components/WatchlistPopup/WatchlistGQL'

export default getEnhancedWatchlist({
  query: FEATURED_WATCHLIST_QUERY,
  name: 'featuredWatchlists'
})

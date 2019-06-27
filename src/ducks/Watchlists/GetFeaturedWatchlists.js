import getEnhancedWatchlist from './getEnhancedWatchlist'
import { FEATURED_WATCHLIST_QUERY } from '../../queries/WatchlistGQL'

export default getEnhancedWatchlist({
  query: FEATURED_WATCHLIST_QUERY,
  name: 'featuredWatchlists'
})

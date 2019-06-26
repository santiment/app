import getEnhancedWatchlist from './getEnhancedWatchlist'
import { featuredWatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'

export default getEnhancedWatchlist({
  query: featuredWatchlistGQL,
  name: 'featuredWatchlists'
})

import { useWatchlist } from '../../Watchlists/gql/hooks'

export const useWatchlistAndScreener = ({ type, settings, skip }) => {
  const id =
    type === 'Watchlist'
      ? settings.target && settings.target.watchlist_id
      : settings.operation.selector && settings.operation.selector.watchlist_id

  const [watchlist] = useWatchlist({
    id,
    skip: skip || !id
  })

  return watchlist
}

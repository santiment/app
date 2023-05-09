import { useWatchlist } from '../../Watchlists/gql/hooks';
export const useWatchlistAndScreener = ({
  type,
  settings,
  skip
}) => {
  const id = type === 'Watchlist' || type === 'Social trends' ? settings.target && settings.target.watchlist_id : settings.operation && settings.operation.selector && settings.operation.selector.watchlist_id;
  const [watchlist, loading] = useWatchlist({
    id,
    skip: skip || !id
  });
  return {
    watchlist,
    isWatchlistLoading: loading
  };
};
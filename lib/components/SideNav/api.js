import { query } from 'webkit/api';

const WATCHLIST_QUERY = id => `query {
    item:watchlist(id:${id}) {
      id
      title:name
    }
  }`;

const accessor = ({
  item
}) => item;

export const queryWatchlist = id => query(WATCHLIST_QUERY(id)).then(accessor);

const mapItems = queries => queries.filter(Boolean);

export function queryRecentItems(queryItems, ids) {
  const query = id => queryItems(id).catch(() => null);

  return ids.length ? Promise.all(ids.map(query)).then(mapItems) : Promise.resolve([]);
}
export const queryRecentWatchlists = ids => queryRecentItems(queryWatchlist, ids);
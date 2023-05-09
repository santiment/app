function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getWatchlistsShortQuery } from './lists/helpers';

function visitWatchlistsCache(visitor) {
  return (cache, {
    data
  }) => {
    const {
      type
    } = data.watchlist;
    const query = getWatchlistsShortQuery(type);
    const {
      watchlists
    } = cache.readQuery({
      query: query
    });
    cache.writeQuery({
      query: query,
      data: {
        watchlists: visitor(data, watchlists)
      }
    });
  };
}

export function updateWatchlistOnEdit(cache, {
  data
}) {
  const updateWatchlist = data.updateWatchlist || data.addWatchlistItems || data.removeWatchlistItems;
  const {
    type
  } = updateWatchlist;
  const query = getWatchlistsShortQuery(type);
  const store = cache.readQuery({
    query: query
  });
  const index = store.watchlists.findIndex(({
    id
  }) => id === updateWatchlist.id);
  store.watchlists[index] = _objectSpread(_objectSpread({}, store.watchlists[index]), updateWatchlist);
  cache.writeQuery({
    query: query,
    data: store
  });
}
export const updateWatchlistsOnCreation = visitWatchlistsCache(({
  watchlist
}, lists) => lists.concat([watchlist]));
export const updateWatchlistsOnDelete = visitWatchlistsCache(({
  watchlist
}, lists) => lists.filter(({
  id
}) => +id !== +watchlist.id));
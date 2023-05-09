function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useIsAuthor } from '../../ducks/Watchlists/gql/list/hooks';
import { constructAddressWatchlistQuery } from '../../ducks/WatchlistAddressesTable/gql/queries';
const OBJECT = {};
const ARRAY = [];
export function useAddressWatchlist(id) {
  const {
    data,
    loading
  } = useQuery(constructAddressWatchlistQuery(), {
    variables: {
      id
    }
  });
  return {
    watchlist: data ? data.watchlist || OBJECT : OBJECT,
    isLoading: loading
  };
}

const itemAccessor = ({
  blockchainAddress
}) => blockchainAddress;

export const useAddressWatchlistItems = watchlist => {
  const {
    listItems,
    id
  } = watchlist;
  const {
    isAuthor
  } = useIsAuthor(watchlist);
  return useMemo(() => listItems ? listItems.map(item => _objectSpread({
    isAuthor,
    watchlistId: id
  }, itemAccessor(item))) : ARRAY, [listItems, isAuthor]);
};
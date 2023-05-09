function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useCallback } from 'react';
import gql from 'graphql-tag';
import { client } from '../../../../../apollo';
export const useMessage = state => {
  const [message, setMessage] = useState('');
  const updateMessage = useCallback(() => {
    if (Array.isArray(state)) {
      const watchlistIDs = state.filter(item => item['watchlistId']);

      if (watchlistIDs.length >= 3 && !message) {
        setMessage('You can select up to 3 watchlists only');
      } else if (message) {
        setMessage('');
      }
    } else if (message) {
      setMessage('');
    }
  }, [state]);
  return {
    message,
    updateMessage
  };
};

const getData = ({
  data
}) => data.item;

const getWatchlist = query => id => client.query({
  query,
  variables: {
    id
  }
}).then(getData).catch(console.warn);

const getItem = getWatchlist(gql`
  query watchlist($id: ID!) {
    item: watchlist(id: $id) {
      id
      name
    }
  }
`);
export function useStateMetadata(state) {
  const [idNameMap, setIdNameMap] = useState({});
  const watchlistIDs = Array.isArray(state) ? state.filter(item => !!item.watchlistId).map(item => item.watchlistId) : [];
  const missingIDs = watchlistIDs.filter(id => !idNameMap[id]);
  Promise.all(missingIDs.map(getItem)).then(items => items.forEach(item => {
    if (item) {
      setIdNameMap(_objectSpread(_objectSpread({}, idNameMap), {}, {
        [+item.id]: item.name
      }));
    }
  }));
  return {
    idNameMap,
    setIdNameMap
  };
}
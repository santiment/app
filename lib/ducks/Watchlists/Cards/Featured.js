const _excluded = ["className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { WatchlistCards } from './Card';
import ProjectCard, { useMarketcap } from './ProjectCard';
import { useFeaturedScreeners, useFeaturedWatchlists } from '../gql/lists/hooks';
import { SCREENER } from '../detector';

const FEATURED_MARKETCAP_HISTORY_QUERY = query => gql`
  query {
    featuredWatchlists:${query} {
      id
      historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
        marketcap
      }
    }
  }
`;

const FEATURED_WATCHLISTS_MARKETCAP_HISTORY_QUERY = FEATURED_MARKETCAP_HISTORY_QUERY('featuredWatchlists');
const FEATURED_SCREENERS_MARKETCAP_HISTORY_QUERY = FEATURED_MARKETCAP_HISTORY_QUERY('featuredScreeners');

const marketcapAccessor = ({
  featuredWatchlists
}, {
  id
}) => featuredWatchlists.find(watchlist => watchlist.id === id);

function useWatchlistMarketcap(watchlist, skip, onLoad, query = FEATURED_WATCHLISTS_MARKETCAP_HISTORY_QUERY) {
  const {
    data
  } = useQuery(query, {
    skip
  });
  return useMarketcap(data, watchlist, onLoad, marketcapAccessor);
}

const FeaturedWatchlists = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [watchlists] = useFeaturedWatchlists();
  const [screeners] = useFeaturedScreeners();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WatchlistCards, _extends({
    Card: ProjectCard
  }, props, {
    className: className,
    watchlists: watchlists,
    path: "/watchlist/projects/",
    useWatchlistMarketcap: useWatchlistMarketcap,
    isWithVisibility: false
  })), screeners.length ? /*#__PURE__*/React.createElement(WatchlistCards, _extends({
    Card: ProjectCard
  }, props, {
    className: className,
    watchlists: screeners,
    path: "/screener/",
    useWatchlistMarketcap: (...args) => useWatchlistMarketcap(...args, FEATURED_SCREENERS_MARKETCAP_HISTORY_QUERY),
    isWithVisibility: false,
    type: SCREENER
  })) : null);
};

export default FeaturedWatchlists;
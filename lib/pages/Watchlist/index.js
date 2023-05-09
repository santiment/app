const _excluded = ["isLoggedIn", "isUserLoading"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PageLoader from '../../components/Loader/PageLoader';
import WatchlistPage from '../Watchlist/Watchlist';
import ScreenerPage from './Screener';
import NewScreener from './NewScreenerFromDefault';
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks';
import { checkIsDefaultScreener, checkIsScreener } from '../../ducks/Screener/utils';
import { getWatchlistId, getWatchlistName } from '../../ducks/Watchlists/utils';

const Watchlist = _ref => {
  let {
    isLoggedIn,
    isUserLoading
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const id = getWatchlistId(props.location.search);
  const [watchlist = {}, loading, error] = useWatchlist({
    id
  });
  const isDefaultScreener = checkIsDefaultScreener(props.location.pathname);

  if (isDefaultScreener && isLoggedIn && !isUserLoading) {
    return /*#__PURE__*/React.createElement(NewScreener, props);
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) {
    return /*#__PURE__*/React.createElement(PageLoader, null);
  }

  if (watchlist === null) {
    return /*#__PURE__*/React.createElement(WatchlistPage, props);
  }

  const name = getWatchlistName(props);
  let isScreener = checkIsScreener(watchlist) || name === 'My Screener';
  return isScreener ? /*#__PURE__*/React.createElement(ScreenerPage, _extends({}, props, {
    name: name,
    id: id,
    isLoading: loading,
    isDefaultScreener: isDefaultScreener,
    isLoggedIn: isLoggedIn,
    watchlist: watchlist
  })) : /*#__PURE__*/React.createElement(WatchlistPage, _extends({}, props, {
    name: name,
    isLoggedIn: isLoggedIn,
    watchlist: watchlist
  }));
};

export default Watchlist;
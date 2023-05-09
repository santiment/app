const _excluded = ["Page", "isDesktop"],
      _excluded2 = ["match"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Redirect } from 'react-router-dom';
import LegacyWatchlistPage from '../Watchlist/Watchlist';
import AssetsMobilePage from '../Watchlists/AssetsMobilePage';
import { getIdFromSEOLink } from '../../utils/url';
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks';
import PageLoader from '../../components/Loader/PageLoader';
import { mutateStoreUserActivity, InteractionType, EntityTypes } from '../../queries/userActivity';
import { useUser } from '../../stores/user';
export const WatchlistPage = _ref => {
  let {
    Page,
    isDesktop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return isDesktop ? /*#__PURE__*/React.createElement(Page, _extends({}, props, props.watchlist, {
    isDesktop: isDesktop
  })) : /*#__PURE__*/React.createElement(AssetsMobilePage, props);
};

function storeUserViewPage(id, pathname) {
  let type;

  if (pathname.startsWith('/screener/')) {
    type = EntityTypes.SCREENER;
  } else if (pathname.startsWith('/watchlist/projects/')) {
    type = EntityTypes.WATCHLIST;
  } else if (pathname.startsWith('/watchlist/')) {
    type = EntityTypes.ADDRESS;
  }

  if (type) {
    mutateStoreUserActivity(type, id, InteractionType.VIEW);
  }
}

const WatchlistProjects = _ref2 => {
  let {
    match
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const id = getIdFromSEOLink(match.params.nameId);
  const [watchlist, isLoading] = useWatchlist({
    id
  });
  const {
    isLoggedIn
  } = useUser();
  if (isLoading) return /*#__PURE__*/React.createElement(PageLoader, null);
  if (!watchlist) return /*#__PURE__*/React.createElement(Redirect, {
    to: "/"
  });

  if (isLoggedIn && props && props.location) {
    storeUserViewPage(id, props.location.pathname);
  }

  return /*#__PURE__*/React.createElement(WatchlistPage, _extends({}, props, {
    type: "list",
    watchlist: watchlist,
    isDesktop: props.isDesktop
  }));
};

WatchlistProjects.defaultProps = {
  Page: LegacyWatchlistPage
};
export default WatchlistProjects;
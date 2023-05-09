function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import WatchlistProjectsPage, { WatchlistPage } from '../WatchlistProjects';
import ScreenerPage from '../Watchlist/Screener';
import NewScreener from '../Watchlist/NewScreenerFromDefault';
import { checkIsDefaultScreener } from '../../ducks/Screener/utils';
const DEFAULT = {};

const Screener = props => {
  const {
    isLoggedIn,
    isUserLoading
  } = props;
  const isDefaultScreener = checkIsDefaultScreener(props.location.pathname);

  if (isDefaultScreener) {
    const Page = isLoggedIn && !isUserLoading ? NewScreener : WatchlistPage;
    return /*#__PURE__*/React.createElement(Page, _extends({}, props, {
      isDefaultScreener: true,
      Page: ScreenerPage,
      watchlist: DEFAULT
    }));
  }

  return /*#__PURE__*/React.createElement(WatchlistProjectsPage, _extends({
    Page: ScreenerPage
  }, props));
};

export default Screener;
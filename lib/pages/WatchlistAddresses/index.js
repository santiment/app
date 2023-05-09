import React from 'react';
import { Redirect } from 'react-router-dom';
import withSizes from 'react-sizes';
import { useAddressWatchlist } from './hooks';
import { getIdFromSEOLink } from '../../utils/url';
import WatchlistAddressesTable from '../../ducks/WatchlistAddressesTable';
import PageLoader from '../../components/Loader/PageLoader';
import { mapSizesToProps } from '../../utils/withSizes';
import TopBar from '../../ducks/Watchlists/Widgets/TopBar/TopBar';
import { BLOCKCHAIN_ADDRESS } from '../../ducks/Watchlists/detector';

const WatchlistAddress = ({
  match,
  isPhone,
  isDesktop
}) => {
  const {
    watchlist,
    isLoading
  } = useAddressWatchlist(getIdFromSEOLink(match.params.nameId));
  if (isLoading) return /*#__PURE__*/React.createElement(PageLoader, null);
  if (!watchlist.id) return /*#__PURE__*/React.createElement(Redirect, {
    to: "/"
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isPhone && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    entity: watchlist,
    type: BLOCKCHAIN_ADDRESS
  })), /*#__PURE__*/React.createElement(WatchlistAddressesTable, {
    watchlist: watchlist,
    isLoading: isLoading,
    isDesktop: isDesktop
  }));
};

export default withSizes(mapSizesToProps)(WatchlistAddress);
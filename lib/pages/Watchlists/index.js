function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Section, { Title, Content } from './Section';
import Page from '../../ducks/Page';
import WatchlistCard from '../../ducks/Watchlists/Cards/ProjectCard';
import WatchlistAddressCard from '../../ducks/Watchlists/Cards/AddressCard';
import { WatchlistCards } from '../../ducks/Watchlists/Cards/Card';
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured';
import NewWatchlistCard from '../../ducks/Watchlists/Cards/NewCard';
import MobileAnonBanner from '../../ducks/Watchlists/Templates/Anon/WatchlistsAnon';
import InlineBanner from '../../components/banners/feature/InlineBanner';
import Tip from '../../components/EmptySection/Tip/Tip';
import { DesktopOnly } from '../../components/Responsive';
import EmptySection from './EmptySection';
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../ducks/Watchlists/detector';
import { newRenderQueue, withRenderQueueProvider, useRenderQueueItem } from '../../ducks/renderQueue/sized';
import { useUser } from '../../stores/user';
import { useAddressWatchlists, useUserProjectWatchlists, useUserScreeners } from '../../ducks/Watchlists/gql/lists/hooks';
import { getRecentWatchlists } from '../../utils/recent';
import { useRecentWatchlists } from '../../ducks/Watchlists/gql/hooks';
import styles from './index.module.css';

const LoginBanner = ({
  isDesktop
}) => isDesktop ? /*#__PURE__*/React.createElement(InlineBanner, {
  title: "Get ability to create your own watchlist when you login",
  description: "Track selected assets in one place and check it's status",
  className: styles.banner
}) : /*#__PURE__*/React.createElement(MobileAnonBanner, {
  isFullScreen: true,
  wrapperClassName: styles.login
});

const QueuedProjectCard = props => {
  const {
    isRendered,
    onLoad
  } = useRenderQueueItem();
  return /*#__PURE__*/React.createElement(WatchlistCard, _extends({}, props, {
    skipMarketcap: !isRendered,
    onMarketcapLoad: onLoad
  }));
};

const Cards = ({
  watchlists,
  path,
  Card = QueuedProjectCard,
  type
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WatchlistCards, {
  className: styles.card,
  Card: Card,
  watchlists: watchlists,
  path: path
}), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(NewWatchlistCard, {
  type: type
})));

const MyWatchlists = ({
  data,
  addressesData,
  isDesktop
}) => {
  const [watchlists, isLoading] = data;
  const [addressesWatchlists, addressesWatchlistsLoading] = addressesData;
  const hasWatchlists = watchlists.length !== 0 || addressesWatchlists.length !== 0;
  const watchlistsIDs = hasWatchlists ? getRecentWatchlists().filter(Boolean) : [];
  const [recentWatchlists] = useRecentWatchlists(watchlistsIDs);
  if (isLoading && addressesWatchlistsLoading) return null;

  if (watchlists.length === 0 && addressesWatchlists.length === 0) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tip, null), /*#__PURE__*/React.createElement(EmptySection, {
      className: styles.empty__img
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, !isDesktop && recentWatchlists.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: cx('body-1 txt-m', isDesktop && 'mrg-l mrg--t mrg--b c-waterloo')
  }, "Recently viewed watchlists"), /*#__PURE__*/React.createElement(Content, {
    isGrid: false,
    className: styles.projects
  }, /*#__PURE__*/React.createElement(Cards, {
    watchlists: recentWatchlists,
    type: PROJECT
  }))), (watchlists.length > 0 || isDesktop) && /*#__PURE__*/React.createElement("h3", {
    className: cx('body-1 txt-m', isDesktop && 'mrg-l mrg--t mrg--b c-waterloo')
  }, "Projects"), /*#__PURE__*/React.createElement(Content, {
    isGrid: isDesktop,
    className: styles.projects
  }, /*#__PURE__*/React.createElement(Cards, {
    watchlists: watchlists,
    type: PROJECT
  })), (addressesWatchlists.length !== 0 || isDesktop) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: "body-1 txt-m"
  }, "Addresses"), /*#__PURE__*/React.createElement(Content, {
    isGrid: isDesktop
  }, /*#__PURE__*/React.createElement(Cards, {
    Card: WatchlistAddressCard,
    watchlists: addressesWatchlists,
    type: BLOCKCHAIN_ADDRESS
  }))));
};

const MyScreeners = () => {
  const [watchlists, isLoading] = useUserScreeners();
  if (isLoading) return null;
  return /*#__PURE__*/React.createElement(Cards, {
    watchlists: watchlists,
    path: "/screener/",
    type: SCREENER
  });
};

const Watchlists = ({
  isDesktop
}) => {
  const {
    isLoggedIn,
    loading
  } = useUser();
  const userWatchlistsData = useUserProjectWatchlists();
  const userAddressesWatchlistsData = useAddressWatchlists();
  return /*#__PURE__*/React.createElement(Page, {
    mainClassName: "relative",
    title: isDesktop ? null : 'My watchlists',
    isCentered: true,
    isWithPadding: !isDesktop
  }, isDesktop && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    isGrid: true,
    title: "Explore watchlists"
  }, /*#__PURE__*/React.createElement(FeaturedWatchlistCards, {
    Card: QueuedProjectCard
  })), /*#__PURE__*/React.createElement(Title, null, "My watchlists")), isLoggedIn ? /*#__PURE__*/React.createElement(MyWatchlists, {
    data: userWatchlistsData,
    addressesData: userAddressesWatchlistsData,
    isDesktop: isDesktop
  }) : loading || /*#__PURE__*/React.createElement(LoginBanner, {
    isDesktop: isDesktop
  }), /*#__PURE__*/React.createElement(Section, {
    isGrid: isDesktop,
    title: isDesktop ? 'My screeners' : 'Screeners'
  }, /*#__PURE__*/React.createElement(MyScreeners, null)));
};

export default withRenderQueueProvider(Watchlists, newRenderQueue(4));
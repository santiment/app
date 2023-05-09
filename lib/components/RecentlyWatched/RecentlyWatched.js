function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import ProjectIcon from '../ProjectIcon/ProjectIcon';
import PercentChanges from '../PercentChanges';
import Skeleton from '../Skeleton/Skeleton';
import { getRecentAssets, getRecentWatchlists } from '../../utils/recent';
import { formatNumber } from '../../utils/formatting';
import WatchlistCard from '../../ducks/Watchlists/Cards/ProjectCard';
import { useRecentWatchlists } from '../../ducks/Watchlists/gql/hooks';
import { useRecentAssets } from '../../hooks/recents';
import { checkIsScreener } from '../../ducks/Screener/utils';
import styles from './RecentlyWatched.module.css';
export const Asset = ({
  project,
  classes = {},
  onClick,
  iconSize = 20
}) => {
  const {
    name,
    ticker,
    priceUsd,
    percentChange7d,
    logoUrl,
    darkLogoUrl,
    slug
  } = project;
  const res = onClick ? {
    Component: 'div',
    props: {
      onClick: () => onClick(project)
    }
  } : {
    Component: Link,
    props: {
      to: `/projects/${slug}`
    }
  };
  return /*#__PURE__*/React.createElement(res.Component, _extends({
    className: cx(styles.item, classes.asset)
  }, res.props), /*#__PURE__*/React.createElement("div", {
    className: styles.group
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    size: iconSize,
    slug: slug,
    logoUrl: logoUrl,
    darkLogoUrl: darkLogoUrl
  }), /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.name, classes.asset__name)
  }, name, " ", /*#__PURE__*/React.createElement("span", {
    className: styles.ticker
  }, ticker))), /*#__PURE__*/React.createElement("div", {
    className: styles.group
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.price
  }, priceUsd ? formatNumber(priceUsd, {
    currency: 'USD'
  }) : 'No data'), /*#__PURE__*/React.createElement(PercentChanges, {
    changes: percentChange7d,
    className: styles.change
  })));
};

const RecentlyWatched = ({
  className = '',
  onProjectClick,
  type,
  classes = {}
}) => {
  const isShowAssets = type === 'assets' || !type;
  const isShowWatchlists = type === 'watchlists' || !type;
  const watchlistsIDs = isShowWatchlists ? getRecentWatchlists().filter(Boolean) : [];
  const assetsSlugs = isShowAssets ? getRecentAssets().filter(Boolean) : [];
  const assetsNumber = assetsSlugs.length;
  const watchlistsNumber = watchlistsIDs.length;
  const [watchlists] = useRecentWatchlists(watchlistsIDs);
  const [assets] = useRecentAssets(assetsSlugs);
  const hasAssets = assets && assets.length > 0;
  const hasWatchlists = watchlists && watchlists.length > 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isShowAssets && (assets ? hasAssets : assetsNumber > 0) && /*#__PURE__*/React.createElement("div", {
    className: cx(className, styles.wrapper)
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, classes.subTitle)
  }, "Recently viewed assets"), /*#__PURE__*/React.createElement(Skeleton, {
    className: styles.skeleton,
    show: !hasAssets,
    repeat: assets ? assets.length : assetsNumber
  }), assets && assets.map(project => /*#__PURE__*/React.createElement(Asset, {
    key: project.slug,
    project: project,
    onClick: onProjectClick,
    classes: classes,
    iconSize: 24
  }))), isShowWatchlists && (watchlists ? hasWatchlists : watchlistsNumber > 0) && /*#__PURE__*/React.createElement("div", {
    className: cx(className, styles.wrapper)
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, classes.subTitle)
  }, "Recently viewed watchlists"), /*#__PURE__*/React.createElement("div", {
    className: styles.watchlistsWrapper
  }, /*#__PURE__*/React.createElement(Skeleton, {
    className: styles.skeleton,
    show: !hasWatchlists,
    repeat: watchlists ? watchlists.length : watchlistsNumber
  }), watchlists && watchlists.map(watchlist => /*#__PURE__*/React.createElement(WatchlistCard, {
    isSimplified: true,
    key: watchlist.id,
    watchlist: watchlist,
    path: checkIsScreener(watchlist) ? '/screener/' : '/watchlist/projects/'
  })))));
};

export default RecentlyWatched;
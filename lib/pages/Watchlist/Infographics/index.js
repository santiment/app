import React from 'react';
import cx from 'classnames';
import { ProjectsTreeMap } from '../../../ducks/Watchlists/Widgets/VolumeChart/ProjectsTreeMap';
import { INFOGRAPHICS, PRICE_CHANGE_RANGES, SOCIAL_VOLUME_CHANGE_RANGES } from '../../../ducks/Watchlists/Widgets/VolumeChart/utils';
import MakeProSubscriptionCard from '../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';
import ProjectsChart from '../../../ducks/Watchlists/Widgets/VolumeChart/ProjectsChart';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import { useScreenerUrlUpdaters } from '../../../ducks/Watchlists/utils';
import WatchlistPriceWidget from '../WatchlistPriceWidget/WatchlistPriceWidget';
import styles from './index.module.css';

const Infographics = ({
  widgets,
  setWidgets,
  assets,
  trendingAssets,
  filterType,
  toggleAssetsFiltering,
  listId,
  type = 'Screener',
  className
}) => {
  const {
    isPriceChartActive,
    isMovement,
    isPriceTreeMap,
    isVolumeTreeMap
  } = widgets;
  const {
    priceTreeMap,
    socialVolumeTreeMap,
    priceBarChart
  } = widgets;
  const {
    isPro
  } = useUserSubscriptionStatus();
  const {
    onChangeSettings
  } = useScreenerUrlUpdaters(widgets, setWidgets);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, isPriceTreeMap && /*#__PURE__*/React.createElement("div", {
    className: styles.treeMaps
  }, /*#__PURE__*/React.createElement(ProjectsTreeMap, {
    listId: listId,
    className: styles.containerTreeMap,
    title: "Price Changes",
    ranges: PRICE_CHANGE_RANGES,
    settings: priceTreeMap,
    sortByMetric: "marketcap_usd",
    type: INFOGRAPHICS.PRICE_TREE_MAP,
    onChangeSettings: onChangeSettings
  })), isVolumeTreeMap && /*#__PURE__*/React.createElement("div", {
    className: styles.treeMaps
  }, isPro ? /*#__PURE__*/React.createElement(ProjectsTreeMap, {
    listId: listId,
    className: styles.containerTreeMap,
    title: "Social Volume Changes",
    ranges: SOCIAL_VOLUME_CHANGE_RANGES,
    settings: socialVolumeTreeMap,
    sortByMetric: "marketcap_usd",
    type: INFOGRAPHICS.SOCIAL_VOLUME_TREE_MAP,
    onChangeSettings: onChangeSettings
  }) : /*#__PURE__*/React.createElement(MakeProSubscriptionCard, null)), isPriceChartActive && /*#__PURE__*/React.createElement(ProjectsChart, {
    type: INFOGRAPHICS.PRICE_BAR_CHART,
    listId: listId,
    settings: priceBarChart,
    onChangeSettings: onChangeSettings
  }), isMovement && /*#__PURE__*/React.createElement(WatchlistPriceWidget, {
    type: type,
    listId: listId,
    items: assets,
    trendingAssets: trendingAssets,
    filterType: filterType,
    toggleAssetsFiltering: toggleAssetsFiltering
  }));
};

export default Infographics;
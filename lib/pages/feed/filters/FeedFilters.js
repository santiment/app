function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Filter from '../../../components/Filter/Filter';
import AlertsAndInsightsFilter, { AUTHOR_TYPES } from './AlertsAndInsightsFilter';
import FeedWatchlistsFilter from './FeedWatchlistsFilter';
import FeedAssetsFilter from './FeedAssetsFilter';
import { getDefaultFilters } from '../GeneralFeed/utils';
import styles from './FeedFilters.module.css';

const FeedFilters = props => {
  return /*#__PURE__*/React.createElement(Filter, {
    dialogTitle: "Feed filters"
  }, /*#__PURE__*/React.createElement(FeedContentWrapper, props));
};

const FeedContentWrapper = ({
  filters,
  handleFiltersChange,
  enableAlertsInsights
}) => {
  const onUpdateAuthor = author => {
    handleFiltersChange(_objectSpread(_objectSpread({}, filters), {}, {
      author
    }));
  };

  const onUpdateWatchlists = watchlists => {
    handleFiltersChange(_objectSpread(_objectSpread({}, filters), {}, {
      watchlists
    }));
  };

  const onUpdateAssets = assets => {
    handleFiltersChange(_objectSpread(_objectSpread({}, filters), {}, {
      assets
    }));
  };

  useEffect(() => {
    onUpdateAuthor(!enableAlertsInsights ? AUTHOR_TYPES.OWN : filters.author);
  }, [enableAlertsInsights]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.dialogContent
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filterBy
  }, "Filter by"), /*#__PURE__*/React.createElement("div", {
    className: styles.resetBlock,
    onClick: () => handleFiltersChange(getDefaultFilters())
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.resetIcon
  }), "Reset filter")), /*#__PURE__*/React.createElement(FeedAssetsFilter, {
    ids: filters.assets,
    onUpdate: onUpdateAssets
  }), /*#__PURE__*/React.createElement(FeedWatchlistsFilter, {
    ids: filters.watchlists,
    onUpdate: onUpdateWatchlists
  }), enableAlertsInsights && /*#__PURE__*/React.createElement(AlertsAndInsightsFilter, {
    selected: filters.author,
    onUpdate: onUpdateAuthor
  }));
};

export default FeedFilters;
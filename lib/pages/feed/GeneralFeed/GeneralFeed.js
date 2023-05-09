const _excluded = ["selectionIndex"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { baseLocation, pulseLocation, personalLocation } from './locations';
import { extractEventsFromData, makeFeedVariables, getFeedAuthorType, getDefaultFilters, isBaseLocation } from './utils';
import EmptyFeed from './EmptyFeed';
import { TIMELINE_EVENTS_QUERY } from '../../../queries/FeedGQL';
import PageLoader from '../../../components/Loader/PageLoader';
import FeedListLoading from './FeedList/FeedListLoading';
import { checkIsLoggedIn, checkIsLoggedInPending } from '../../UserSelectors';
import FeedSorters, { DATETIME_SORT } from '../sorters/FeedSorters';
import FeedHelpPopup from './HelpPopup/FeedHelpPopup';
import Tabs from '@santiment-network/ui/Tabs';
import FeedFilters from '../filters/FeedFilters';
import PulseInsights from './PulseInsights/PulseInsights';
import styles from './GeneralFeed.module.css';
const tabs = [{
  index: `${baseLocation}`,
  content: 'General'
}, {
  index: pulseLocation,
  content: 'Pulse'
}, {
  index: personalLocation,
  content: 'My Feed',
  requireLogin: true
}];

const Header = ({
  onChangeSort,
  sortType,
  onChangeTab,
  tab,
  onChangeFilters,
  filters,
  isLoggedIn,
  isPulse
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, /*#__PURE__*/React.createElement("div", {
  className: styles.title
}, /*#__PURE__*/React.createElement("div", null, "Feed"), /*#__PURE__*/React.createElement(FeedHelpPopup, null), !isPulse && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FeedFilters, {
  handleFiltersChange: onChangeFilters,
  filters: filters,
  enableAlertsInsights: isBaseLocation(tab)
}), /*#__PURE__*/React.createElement(FeedSorters, {
  className: styles.sort,
  onChangeSort: onChangeSort,
  sortType: sortType
}))), /*#__PURE__*/React.createElement(Tabs, {
  options: isLoggedIn ? tabs : tabs.filter(({
    requiredLogin
  }) => !requiredLogin),
  defaultSelectedIndex: tab,
  passSelectionIndexToItem: true,
  className: styles.tabs,
  onSelect: onChangeTab,
  as: _ref => {
    let {
      selectionIndex
    } = _ref,
        props = _objectWithoutProperties(_ref, _excluded);

    return /*#__PURE__*/React.createElement(Link, _extends({}, props, {
      to: selectionIndex
    }));
  }
}));

const START_DATE = new Date();

const GeneralFeed = ({
  isLoggedIn,
  isUserLoading,
  location
}) => {
  const {
    pathname
  } = location;
  const [tab, setTab] = useState(isLoggedIn ? pathname : baseLocation);
  const [isPulse, setPulse] = useState(tab === pulseLocation);
  const [sortType, setSortType] = useState(DATETIME_SORT);
  const [filters, setFilters] = useState(getDefaultFilters(tab));

  const onChangeTab = value => {
    setTab(value);
  };

  useEffect(() => {
    setFilters(_objectSpread(_objectSpread({}, filters), {}, {
      author: getFeedAuthorType(tab)
    }));
    setPulse(tab === pulseLocation);
  }, [tab]);

  const onChangeSort = value => {
    if (value) {
      setSortType(value);
    }
  };

  if (isUserLoading) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
      onChangeSort: onChangeSort,
      sortType: sortType,
      onChangeTab: onChangeTab,
      tab: tab,
      isLoggedIn: isLoggedIn,
      onChangeFilters: setFilters,
      filters: filters,
      isPulse: isPulse
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.scrollable
    }, /*#__PURE__*/React.createElement(PageLoader, null)));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Header, {
    onChangeSort: onChangeSort,
    sortType: sortType,
    onChangeTab: onChangeTab,
    isLoggedIn: isLoggedIn,
    tab: tab,
    onChangeFilters: setFilters,
    filters: filters,
    isPulse: isPulse
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.scrollable
  }, isPulse ? /*#__PURE__*/React.createElement(PulseInsights, null) : /*#__PURE__*/React.createElement(Query, {
    query: TIMELINE_EVENTS_QUERY,
    variables: makeFeedVariables({
      date: START_DATE,
      orderBy: sortType.type,
      filterBy: filters
    }),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only"
  }, props => {
    const {
      data,
      fetchMore: fetchMoreCommon,
      loading: loadingEvents
    } = props;

    if (!data) {
      return /*#__PURE__*/React.createElement(EmptyFeed, null);
    }

    return /*#__PURE__*/React.createElement(FeedListLoading, {
      events: extractEventsFromData(data),
      fetchMoreCommon: fetchMoreCommon,
      isLoading: loadingEvents,
      sortType: sortType,
      filters: filters,
      showProfileExplanation: isBaseLocation(tab)
    });
  })));
};

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isUserLoading: checkIsLoggedInPending(state)
});

export default connect(mapStateToProps)(GeneralFeed);
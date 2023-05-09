const _excluded = ["onProjectClick", "showChange"],
      _excluded2 = ["change", "ticker", "slug", "name"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { graphql } from 'react-apollo';
import Tabs from '@santiment-network/ui/Tabs';
import Label from '@santiment-network/ui/Label';
import Panel from '@santiment-network/ui/Panel/Panel';
import { TOP_SOCIAL_GAINERS_LOSERS_QUERY } from './gainersLosersGQL';
import ProjectIcon from '../ProjectIcon/ProjectIcon';
import PercentChanges from '../PercentChanges';
import { DAY, getTimeIntervalFromToday } from '../../utils/dates';
import styles from './GainersLosersTabs.module.css';

const Item = _ref => {
  let {
    onProjectClick,
    showChange
  } = _ref,
      project = _objectWithoutProperties(_ref, _excluded);

  const {
    change,
    ticker,
    slug,
    name
  } = project,
        urls = _objectWithoutProperties(project, _excluded2);

  return slug ? /*#__PURE__*/React.createElement("div", {
    className: styles.project,
    onClick: () => onProjectClick(project)
  }, /*#__PURE__*/React.createElement(ProjectIcon, _extends({
    slug: slug,
    size: 20
  }, urls)), name && /*#__PURE__*/React.createElement(Label, {
    className: styles.name
  }, name), /*#__PURE__*/React.createElement(Label, {
    className: cx(styles.ticker, !name && styles.tickerWithMargin)
  }, ticker), showChange && /*#__PURE__*/React.createElement(PercentChanges, {
    changes: change * 100,
    className: styles.changes
  })) : null;
};

const TYPES = {
  gainers: 'Top gainers',
  losers: 'Top losers'
};
const tabs = [{
  index: TYPES.gainers,
  content: TYPES.gainers
}, {
  index: TYPES.losers,
  content: TYPES.losers
}];

const GainersLosersTabs = ({
  gainers,
  losers,
  onProjectClick,
  className,
  titleClassName,
  classes = {}
}) => {
  let [selectedTab, setSelectedTab] = useState(tabs[0].index);

  function handleSelectTab(tab) {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  }

  const tabItems = selectedTab === TYPES.gainers ? gainers : losers;
  return gainers.length > 0 ? /*#__PURE__*/React.createElement("section", {
    className: className
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, titleClassName)
  }, "Social gainers and losers"), /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(Tabs, {
    className: cx(styles.tabs, classes.tabs),
    options: tabs,
    defaultSelectedIndex: selectedTab,
    onSelect: handleSelectTab
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, tabItems.map((project, idx) => /*#__PURE__*/React.createElement(Item, _extends({
    key: idx
  }, project, {
    onProjectClick: onProjectClick,
    showChange: tabItems === gainers
  })))))) : null;
};

const withGainersLosers = graphql(TOP_SOCIAL_GAINERS_LOSERS_QUERY, {
  options: ({
    timeWindow,
    size
  }) => {
    const {
      from,
      to
    } = getTimeIntervalFromToday(-2, DAY);
    return {
      variables: {
        size,
        from: from.toISOString(),
        to: to.toISOString(),
        timeWindow,
        status: 'ALL'
      }
    };
  },
  props: ({
    data: {
      topSocialGainersLosers = [],
      loading
    }
  }) => {
    const {
      length
    } = topSocialGainersLosers;
    const gainers = [];
    const losers = [];

    if (length > 0) {
      topSocialGainersLosers[length - 1].projects.forEach(({
        project,
        status,
        change
      }) => {
        if (status === 'GAINER') gainers.push(_objectSpread(_objectSpread({}, project), {}, {
          change
        }));
        if (status === 'LOSER') losers.push(_objectSpread(_objectSpread({}, project), {}, {
          change
        }));
      });
    }

    return {
      gainers,
      losers,
      isLoading: loading
    };
  }
});
export default withGainersLosers(GainersLosersTabs);
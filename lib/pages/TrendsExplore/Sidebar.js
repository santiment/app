const _excluded = ["topics", "linkedAssets", "isDesktop", "isEmptySearch"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { getTimePeriod } from './utils';
import Calendar from '../../ducks/Studio/AdvancedView/Calendar';
import EnhancedWordCloud from './EnhancedWordCloud';
import AverageSocialVolume from '../../components/AverageSocialVolume';
import HelpPopup from '../../components/HelpPopup/HelpPopup';
import TrendsTable from '../../ducks/TrendsTable';
import Trends from '../../components/Trends/Trends';
import Footer from '../../components/Footer';
import { checkIsToday } from '../../utils/dates';
import styles from './Sidebar.module.css';
const MAX_DATE = new Date();

const Sidebar = _ref => {
  let {
    topics,
    linkedAssets,
    isDesktop,
    isEmptySearch
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [trendDate, setTrendDate] = useState([MAX_DATE]);
  const [trendPeriod, setTrendPeriod] = useState();

  function onTrendCalendarChange(date) {
    setTrendDate([date]);
    let period;

    if (!checkIsToday(date)) {
      period = getTimePeriod(date);
      period.interval = '1d';
    }

    setTrendPeriod(period);
  }

  return /*#__PURE__*/React.createElement("aside", {
    className: cx(styles.sidebar, 'column no-scrollbar')
  }, !isEmptySearch && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AverageSocialVolume, _extends({}, props, {
    topics: topics,
    linkedAssets: linkedAssets,
    isDesktop: isDesktop
  })), /*#__PURE__*/React.createElement(EnhancedWordCloud, {
    words: topics,
    isDesktop: isDesktop
  })), /*#__PURE__*/React.createElement("div", {
    className: cx('row v-center mrg-l mrg--b', !isDesktop && styles.trendsWrapper)
  }, isDesktop ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: "mrg-s mrg--r"
  }, "Trending words top 10"), /*#__PURE__*/React.createElement(HelpPopup, null, /*#__PURE__*/React.createElement("h4", {
    className: "txt-m mrg-xs mrg--b"
  }, "Trending words"), "Top 10 words with the highest spike in mentions on crypto social media for a given day.")) : /*#__PURE__*/React.createElement("div", {
    className: "body-1 txt-m"
  }, "Trending words"), /*#__PURE__*/React.createElement(Calendar, {
    isDesktop: isDesktop,
    dates: trendDate,
    onChange: onTrendCalendarChange,
    className: cx(styles.calendar, !isDesktop && cx(styles.mobileCalendar, 'body-3')),
    maxDate: MAX_DATE
  })), isDesktop ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrendsTable, {
    isCompact: true,
    period: trendPeriod
  }), /*#__PURE__*/React.createElement(Footer, {
    classes: {
      footer: cx(styles.footer, 'column mrg-xxl mrg--t'),
      footerVersionDivider: styles.footerVersionDivider
    }
  })) : /*#__PURE__*/React.createElement(Trends, {
    className: styles.trends,
    isWithColumnTitles: false,
    period: trendPeriod
  }));
};

export default Sidebar;
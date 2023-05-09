import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import HelpPopupTrends from '../../../pages/Trends/HelpPopupTrends';
import styles from './Suggestions.module.css';
const SUGGESTIONS = [{
  trend: 'Buy the dip',
  options: '',
  link: '(buy OR bought) AND (dip OR dips)'
}, {
  trend: 'bottom',
  options: ''
}, {
  trend: 'sell',
  options: ''
}];

const TrendsExploreSuggestions = () => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, 'row v-center')
}, /*#__PURE__*/React.createElement("p", {
  className: "c-casper mrg-xs mrg--r"
}, "Try out:"), /*#__PURE__*/React.createElement("p", {
  className: "row nowrap mrg-xs mrg--r"
}, SUGGESTIONS.map(({
  trend,
  options,
  link
}, index) => /*#__PURE__*/React.createElement(Link, {
  key: trend,
  to: `/labs/trends/explore/${link || trend}${options && '?' + options}`,
  className: "btn btn-0 mrg-xs mrg--r"
}, trend, index !== SUGGESTIONS.length - 1 && ','))), /*#__PURE__*/React.createElement(HelpPopupTrends, {
  className: styles.tooltip,
  triggerClassName: styles.tooltipIcon
}));

export default TrendsExploreSuggestions;
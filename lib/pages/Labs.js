function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Card from '../components/LabsCard';
import MobileHeader from '../components/MobileHeader/MobileHeader';
import { DesktopOnly, MobileOnly } from '../components/Responsive';
import styles from './Labs.module.css';
const cards = [{
  title: 'Historical balance',
  description: /*#__PURE__*/React.createElement("div", null, "Look up any wallet\u2019s history of Ethereum and ERC20 holdings. Choose up to 5 assets for a detailed breakdown."),
  link: '/labs/balance',
  className: styles.historicalBalance,
  bgClassName: styles.historicalBalanceBg
}, {
  title: 'Social trends',
  description: /*#__PURE__*/React.createElement("div", null, "Explore the social volume of any word/phrase on crypto social media over time."),
  link: '/dashboards',
  className: styles.trends,
  bgClassName: styles.trendsBg
}, {
  title: 'Graphs',
  description: /*#__PURE__*/React.createElement("div", null, "Our advanced on-chain, social and development metrics for all crypto projects in Santiment\u2019s database."),
  href: 'https://graphs.santiment.net/',
  className: styles.dashboard,
  bgClassName: styles.dashboardBg
}];

const Labs = () => /*#__PURE__*/React.createElement("div", {
  className: "page"
}, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("h1", {
  className: styles.heading
}, "Labs")), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
  title: "Labs"
})), /*#__PURE__*/React.createElement("div", {
  className: styles.flexRow
}, cards.map(card => /*#__PURE__*/React.createElement(Card, _extends({
  key: card.title
}, card)))));

export default Labs;
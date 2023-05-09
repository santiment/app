function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@santiment-network/ui/Dialog';
import { Title } from '../../pages/HistoricalBalance';
import HistoricalBalance from '../../ducks/HistoricalBalance';
import { assetConvertor } from '../../ducks/HistoricalBalance/url';
import { formIntervalSettings } from '../../ducks/SANCharts/IntervalSelector';
import styles from './WalletLink.module.css';
import dialogStyles from './ViewBalanceDialog.module.css';

const SETTINGS = _objectSpread(_objectSpread({}, formIntervalSettings('7d')), {}, {
  timeRange: '7d'
});

const ViewBalanceDialog = ({
  address,
  assets,
  trigger,
  priceMetrics
}) => {
  return /*#__PURE__*/React.createElement(Dialog, {
    title: /*#__PURE__*/React.createElement("div", {
      className: dialogStyles.title
    }, /*#__PURE__*/React.createElement(Title, null)),
    trigger: /*#__PURE__*/React.createElement("div", null, trigger || /*#__PURE__*/React.createElement(BalancePageLink, {
      link: "#"
    })),
    classes: dialogStyles
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: dialogStyles.content
  }, /*#__PURE__*/React.createElement(HistoricalBalance, {
    defaultPriceAssets: priceMetrics,
    defaultChartAssets: assets.map(assetConvertor),
    defaultSettings: _objectSpread(_objectSpread({}, SETTINGS), {}, {
      address
    })
  })));
};

const BalancePageLink = ({
  link
}) => {
  return /*#__PURE__*/React.createElement(Link, {
    to: link,
    className: styles.link
  }, "Show historical balance");
};

export default ViewBalanceDialog;
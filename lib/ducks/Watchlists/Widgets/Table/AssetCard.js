const _excluded = ["slug", "name", "ticker", "logoUrl", "priceUsd", "priceRange", "marketcapUsd", "onAssetClick", "className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ProjectIcon from './../../../../components/ProjectIcon/ProjectIcon';
import PercentChanges from './../../../../components/PercentChanges';
import { formatNumber, millify } from '../../../../utils/formatting';
import PriceGraph from './PriceGraph';
import styles from './AssetCard.module.css';
const PRICE_RANGES = {
  '1d': 'percentChange24h',
  '7d': 'percentChange7d'
};

const AssetCard = _ref => {
  let {
    slug,
    name,
    ticker,
    logoUrl,
    priceUsd = 0,
    priceRange,
    marketcapUsd = 0,
    onAssetClick,
    className
  } = _ref,
      asset = _objectWithoutProperties(_ref, _excluded);

  const minimumFractionDigits = priceUsd > 99999 ? 0 : 2;
  const maximumFractionDigits = priceUsd > 99999 ? 0 : priceUsd > 2 ? 2 : 6;
  const graphKey = asset[`priceChart${priceRange}`];
  return /*#__PURE__*/React.createElement(Link, {
    className: cx(styles.wrapper, 'body-2 row justify c-black', className),
    to: `/projects/${slug}`,
    onClick: onAssetClick
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.left, 'row')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.icon, 'row hv-center')
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    size: 20,
    slug: slug,
    logoUrl: logoUrl
  })), /*#__PURE__*/React.createElement("div", {
    className: "column mrg-s mrg--l"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.name, 'nowrap line-clamp mrg-xs mrg--b')
  }, name), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.subRow, 'row')
  }, "$", millify(marketcapUsd, 0), /*#__PURE__*/React.createElement("span", {
    className: "mrg-xs mrg--l c-casper"
  }, ticker.toUpperCase())))), /*#__PURE__*/React.createElement(PriceGraph, {
    data: graphKey,
    className: styles.chart,
    width: 80
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.right, 'row')
  }, priceUsd ? formatNumber(priceUsd, {
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits
  }) : 'No data', /*#__PURE__*/React.createElement(PercentChanges, {
    className: styles.percentChanges,
    changes: asset[PRICE_RANGES[priceRange]] || 0
  })));
};

export default AssetCard;
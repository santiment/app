const _excluded = ["priceUsd", "percentChange24h", "percentChange7d"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { formatNumber } from '../../../utils/formatting';
import Widget from '../../../components/PriceChangesWidget/PriceChangesWidget';
import styles from './MobileAssetPriceInfo.module.css';

const MobileAssetPriceInfo = _ref => {
  let {
    priceUsd,
    percentChange24h,
    percentChange7d
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const RANGES = [{
    range: '24h',
    value: percentChange24h
  }, {
    range: '7d',
    value: percentChange7d
  }];
  let [activeRange, setActiveRange] = useState(0);

  const changeRange = () => {
    const nextRangeIndex = ++activeRange;
    setActiveRange(nextRangeIndex >= RANGES.length ? 0 : nextRangeIndex);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.priceBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.priceUsd
  }, priceUsd && formatNumber(priceUsd, {
    currency: 'USD'
  }))), /*#__PURE__*/React.createElement(Widget, _extends({}, props, {
    price: priceUsd,
    onRangeChange: changeRange,
    changes: RANGES[activeRange].value,
    range: RANGES[activeRange].range,
    className: styles.highLow
  })));
};

export default MobileAssetPriceInfo;
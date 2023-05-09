function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import Dropdown from '@santiment-network/ui/Dropdown';
import styles from './PricePairsDropdown.module.css';
const dropdownClasses = {
  wrapper: styles.dropdown,
  options: styles.dropdownOptions,
  option: styles.dropdownOption
};
const SEPARATOR = ' / ';
export const TICKER_SLUG_PAIRS = [['BTC', 'bitcoin'], ['ETH', 'ethereum']];

const getPriceOptions = assets => {
  const options = new Map(TICKER_SLUG_PAIRS);
  assets.map(([ticker, slug]) => options.set(ticker, slug));
  return options;
};

const getLabels = options => options.map(([ticker]) => `${ticker}${SEPARATOR}USD`);

const PricePairsDropdown = ({
  allDetectedAssets,
  settings,
  setSettings,
  setPriceAsset,
  priceAsset
}) => {
  const {
    ticker,
    asset: slug
  } = settings;
  const defaultPriceOptions = getPriceOptions([[ticker, slug]]);
  const [priceOptions, setPriceOptions] = useState(defaultPriceOptions);
  const labels = getLabels([...priceOptions]);

  if (!priceAsset) {
    setPriceAsset({
      slug,
      label: `${ticker}${SEPARATOR}USD`
    });
  }

  useEffect(() => {
    if (allDetectedAssets.size > 0) {
      const pairs = [];
      allDetectedAssets.forEach(pair => {
        if (pair) {
          pairs.push([pair.ticker, pair.slug]);
        }
      });
      const newPriceOptions = getPriceOptions([[ticker, slug], ...pairs]);
      setPriceOptions(newPriceOptions);
    }
  }, [allDetectedAssets]);

  function onChangePriceOption(selectedPair) {
    const ticker = selectedPair.split(SEPARATOR)[0];
    const slug = priceOptions.get(ticker);
    setPriceAsset({
      slug,
      label: `${ticker}${SEPARATOR}USD`
    });
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      asset: slug,
      ticker
    }));
  }

  return /*#__PURE__*/React.createElement(Dropdown, {
    selected: `${ticker}${SEPARATOR}USD`,
    options: labels,
    classes: dropdownClasses,
    onSelect: onChangePriceOption
  });
};

export default PricePairsDropdown;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { ASSETS_LIMIT, withDefaults } from './defaults';
import { useSettings, useWalletAssets } from './hooks';
import Chart from './Chart';
import AddressSetting from './Address';
import Comments from './Comments';
import AddressTransactions from './AddressTransactions'; // import Sankey from './Sankey'

import { withSizes, DesktopOnly } from '../../components/Responsive';
import { Infrastructure } from '../../utils/address';
import styles from './index.module.css';

const Sankey = () => null;

const HistoricalBalance = ({
  children,
  defaultSettings,
  defaultChartAssets,
  defaultPriceAssets,
  defaultIsLog,
  isPhone
}) => {
  const {
    settings,
    changeTimePeriod,
    onAddressChange
  } = useSettings(defaultSettings);
  const {
    walletAssets,
    isLoading,
    isError
  } = useWalletAssets(settings);
  const [chartAssets, setChartAssets] = useState(defaultChartAssets);
  const [priceAssets, setPriceAssets] = useState(defaultPriceAssets);
  const [isLog, setIsLog] = useState(defaultIsLog);
  useEffect(() => {
    if (chartAssets.length) return;
    if (!walletAssets.length) return;
    setChartAssets(walletAssets.slice(0, 1));
  }, [walletAssets]);
  useEffect(() => {
    const priceAssetsSet = new Set(priceAssets);
    const priceAssetsToDelete = new Set(priceAssetsSet);
    chartAssets.forEach(({
      slug
    }) => priceAssetsToDelete.delete(slug));
    priceAssetsToDelete.forEach(asset => priceAssetsSet.delete(asset));
    setPriceAssets([...priceAssetsSet]);
  }, [chartAssets]);

  function togglePriceAsset(asset) {
    const priceAssetsSet = new Set(priceAssets);

    if (priceAssetsSet.has(asset)) {
      priceAssetsSet.delete(asset);
    } else {
      priceAssetsSet.add(asset);
    }

    setPriceAssets([...priceAssetsSet]);
  }

  function updateChartAssets(asset) {
    if (Array.isArray(asset)) {
      setChartAssets(asset.map(item => _objectSpread({}, item.value)));
    } else {
      if (chartAssets.length + 1 > ASSETS_LIMIT) return;
      setChartAssets([...chartAssets, asset.value]);
      const {
        slug
      } = asset.value;

      if (!priceAssets.includes(slug)) {
        setPriceAssets([...priceAssets, slug]);
      }
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AddressSetting, {
    className: isPhone && styles.address_phone,
    settings: settings,
    walletAssets: walletAssets,
    chartAssets: chartAssets,
    isError: isError,
    onAddressChange: onAddressChange
  }), /*#__PURE__*/React.createElement(Chart, {
    className: styles.chart,
    canvasClassName: styles.canvas,
    height: isPhone ? 340 : 450,
    settings: settings,
    chartAssets: chartAssets,
    priceAssets: priceAssets,
    walletAssets: walletAssets,
    isPhone: isPhone,
    isLog: isLog,
    isLoading: isLoading,
    togglePriceAsset: togglePriceAsset,
    changeTimePeriod: changeTimePeriod,
    setChartAssets: updateChartAssets,
    setIsLog: setIsLog
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, settings.infrastructure === Infrastructure.ETH && /*#__PURE__*/React.createElement(Sankey, {
    settings: settings
  }))), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.bottom, isPhone && styles.bottom_phone)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, /*#__PURE__*/React.createElement(AddressTransactions, {
    settings: settings,
    walletAssets: walletAssets
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement(Comments, {
    settings: settings
  }))), React.Children.map(children, child => child && /*#__PURE__*/React.cloneElement(child, {
    settings,
    chartAssets,
    priceAssets,
    isLog,
    onAddressChange
  })));
};

HistoricalBalance.defaultProps = {
  defaultChartAssets: [],
  defaultPriceAssets: [],
  defaultIsLog: false
};
export default withDefaults(withSizes(HistoricalBalance));
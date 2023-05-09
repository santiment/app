import React, { useMemo } from 'react';
import cx from 'classnames';
import { logScale, linearScale } from '@santiment-network/chart/scales';
import Canvas, { useResponsiveTicks } from './Canvas';
import Assets from './Assets';
import DatePicker from './DatePicker';
import SettingsMenu from './SettingsMenu';
import { useWalletMetrics } from '../hooks';
import { generateSearchQuery } from '../url';
import { ShareButton } from '../../Studio/Header/Settings';
import styles from './index.module.css';

const Chart = ({
  children,
  className,
  canvasClassName,
  height,
  settings,
  chartAssets,
  priceAssets,
  walletAssets,
  isLog,
  isPhone,
  isLoading,
  togglePriceAsset,
  changeTimePeriod,
  setIsLog,
  setChartAssets
}) => {
  const metrics = useWalletMetrics(chartAssets, priceAssets);
  const axesTicks = useResponsiveTicks(isPhone);
  const sharePath = useMemo(() => '/labs/balance?' + generateSearchQuery(settings, chartAssets, priceAssets, isLog), [settings, chartAssets, priceAssets, isLog]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, isPhone && styles.header_phone)
  }, /*#__PURE__*/React.createElement(Assets, {
    className: isPhone ? styles.settings__assets_phone : styles.settings__assets,
    walletAssets: walletAssets,
    chartAssets: chartAssets,
    isLoading: isLoading,
    setChartAssets: setChartAssets
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement(DatePicker, {
    settings: settings,
    isPhone: isPhone,
    changeTimePeriod: changeTimePeriod
  }), /*#__PURE__*/React.createElement(ShareButton, {
    sharePath: sharePath
  }), /*#__PURE__*/React.createElement(SettingsMenu, {
    isLog: isLog,
    settings: settings,
    chartAssets: chartAssets,
    priceAssets: priceAssets,
    togglePriceAsset: togglePriceAsset,
    setIsLog: setIsLog
  }))), /*#__PURE__*/React.createElement(Canvas, {
    className: canvasClassName,
    axesTicks: axesTicks,
    height: height,
    scale: isLog ? logScale : linearScale,
    settings: settings,
    metrics: metrics
  }), children);
};

export default Chart;
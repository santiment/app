import React from 'react';
import TotalBtcCard from './TotalBtcCard';
import BtcCirculationSupply from './BtcCirculationSupply';
import PercentOfEthMarketcap from './PercentOfEthMarketcap';
import styles from './BtcStatistics.module.css';
const SETTINGS = {
  from: 'utc_now-1d',
  to: 'utc_now'
};

const BtcStatistics = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(TotalBtcCard, {
    settings: SETTINGS
  }), /*#__PURE__*/React.createElement(BtcCirculationSupply, {
    settings: SETTINGS
  }), /*#__PURE__*/React.createElement(PercentOfEthMarketcap, {
    settings: SETTINGS
  }));
};

export default BtcStatistics;
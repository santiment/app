import React from 'react';
import cx from 'classnames';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import BtcStatistics from '../../../../ducks/BtcDistribution/BtcStatistics/BtcStatistics';
import DistributionBtcOnEth from '../../../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth';
import TotalBtcOnEth from '../../../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth';
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall';
import { useRestrictedInfo } from '../../hooks';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import dashboardsStyles from '../dashboards.module.css';

const BtcLocked = () => {
  const isProChecking = useRestrictedInfo({
    metric: 'total_supply'
  });
  return /*#__PURE__*/React.createElement("section", {
    className: cx(dashboardsStyles.wrapper, 'column')
  }, /*#__PURE__*/React.createElement(Info, {
    title: "Bitcoin Locked on Ethereum",
    description: ""
  }), /*#__PURE__*/React.createElement("main", {
    className: cx(dashboardsStyles.content, 'column')
  }, /*#__PURE__*/React.createElement(Section, {
    id: "btc_total_supply",
    title: "Total Supply"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: isProChecking
  }, /*#__PURE__*/React.createElement(BtcStatistics, null)))), /*#__PURE__*/React.createElement(Section, {
    id: "btc_distribution",
    title: "Distribution of Bitcoin on Ethereum"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DistributionBtcOnEth, null))), /*#__PURE__*/React.createElement(Section, {
    id: "btc_total_eth",
    title: "Total BTC on Ethereum"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TotalBtcOnEth, null)))));
};

export default withRenderQueueProvider(BtcLocked);
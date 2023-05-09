import React from 'react';
import cx from 'classnames';
import VolumeOfEthTrades from '../../../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades';
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall';
import LabelBalances from '../../../../ducks/Labels/LabelBalances/LabelBalances';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import { useRestrictedInfo } from '../../hooks';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import dashboardsStyles from '../dashboards.module.css';

const EthTokenTrading = () => {
  const isLabelsProChecking = useRestrictedInfo({
    metric: 'all_known_balance'
  });
  return /*#__PURE__*/React.createElement("section", {
    className: cx(dashboardsStyles.wrapper, 'column')
  }, /*#__PURE__*/React.createElement(Info, {
    title: "ETH Token Trading Analysis",
    description: ""
  }), /*#__PURE__*/React.createElement("main", {
    className: cx(dashboardsStyles.content, 'column')
  }, /*#__PURE__*/React.createElement(Section, {
    id: "eth_token_volume_against_eth",
    title: "Volume against ETH Based tokens (DEXs)"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VolumeOfEthTrades, {
    metric: "eth_trade_volume_by_token"
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "eth_token_volume_against_usd",
    title: "Volume against USD Based tokens (Stablecoins)"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VolumeOfEthTrades, {
    metric: "stablecoin_trade_volume_by_token"
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "eth_token_token_against_eth",
    title: "Token Price against ETH Based Tokens segmented by DEXs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VolumeOfEthTrades, {
    metric: "token_eth_price_by_dex_5m"
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "eth_token_label_balance",
    title: "Label Balance"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: isLabelsProChecking
  }, /*#__PURE__*/React.createElement(LabelBalances, null))))));
};

export default withRenderQueueProvider(EthTokenTrading);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import SocialTool from './dashboards/SocialTool/SocialTool';
import EthStakingPoolsPage from './dashboards/EthStakingPools/EthStakingPools';
import EthTokenTrading from './dashboards/EthTokenTrading/EthTokenTrading';
import Eth2 from './dashboards/Eth2/Eth2';
import Stablecoins from './dashboards/Stablecoins/Stablecoins';
import UniswapProtocol from './dashboards/Uniswap/Uniswap';
import DecentralizedExchanges from './dashboards/DecentralizedExchanges/DecentralizedExchanges';
import BtcLocked from './dashboards/BtcLocked/BtcLocked';
import NFT from './dashboards/NFT/NFT';
import Nav from './Nav/Nav';
import { useNav } from './hooks';
import { DASHBOARDS_TITLES } from './constants';
import styles from './Dashboards.module.css';

const Dashboards = props => {
  const {
    history,
    match,
    location,
    isDesktop
  } = props;
  const navSettings = useNav({
    history,
    match,
    location
  });
  const {
    activeItem
  } = navSettings;
  let content = null;

  if (activeItem) {
    const {
      title
    } = activeItem;
    if (title === DASHBOARDS_TITLES.SOCIAL_TOOL) content = /*#__PURE__*/React.createElement(SocialTool, _extends({}, props, {
      isDesktop: isDesktop
    }));
    if (title === DASHBOARDS_TITLES.ETH_TOKEN_TRADING) content = /*#__PURE__*/React.createElement(EthTokenTrading, props);
    if (title === DASHBOARDS_TITLES.ETH_2_STAKING) content = /*#__PURE__*/React.createElement(Eth2, props);
    if (title === DASHBOARDS_TITLES.ETH_STAKING) content = /*#__PURE__*/React.createElement(EthStakingPoolsPage, props);
    if (title === DASHBOARDS_TITLES.STABLECOINS) content = /*#__PURE__*/React.createElement(Stablecoins, props);
    if (title === DASHBOARDS_TITLES.UNISWAP_PROTOCOL) content = /*#__PURE__*/React.createElement(UniswapProtocol, props);
    if (title === DASHBOARDS_TITLES.DECENTRALIZED_EXCHANGES) content = /*#__PURE__*/React.createElement(DecentralizedExchanges, props);
    if (title === DASHBOARDS_TITLES.BTC_LOCKED) content = /*#__PURE__*/React.createElement(BtcLocked, props);
    if (title === DASHBOARDS_TITLES.NFT_INFLUENCERS_TRX) content = /*#__PURE__*/React.createElement(NFT, props);
  }

  return /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, 'row')
  }, /*#__PURE__*/React.createElement(Nav, {
    navSettings: navSettings
  }), /*#__PURE__*/React.createElement("main", {
    className: "fluid"
  }, content));
};

export default Dashboards;
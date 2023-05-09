import React from 'react';
import Settings from './Settings';
import styles from './AccountPage.module.css';

const SettingsGetTokens = () => /*#__PURE__*/React.createElement(Settings, {
  id: "get-tokens",
  header: "Get tokens"
}, /*#__PURE__*/React.createElement(Settings.Row, {
  style: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: styles.getTokens
}, "Get SAN tokens"), /*#__PURE__*/React.createElement("div", {
  className: styles.tokens__markets
}, /*#__PURE__*/React.createElement("a", {
  className: styles.tokens__market,
  href: "https://kyberswap.com/swap/eth-san",
  rel: "noopener noreferrer",
  target: "_blank"
}, "Kyber"), /*#__PURE__*/React.createElement("a", {
  className: styles.tokens__market,
  href: "https://app.uniswap.org/#/swap?outputCurrency=0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
  rel: "noopener noreferrer",
  target: "_blank"
}, "Uniswap"), /*#__PURE__*/React.createElement("a", {
  className: styles.tokens__market,
  href: "https://www.bitfinex.com/t/SANUSD",
  rel: "noopener noreferrer",
  target: "_blank"
}, "Bitfinex"), /*#__PURE__*/React.createElement("a", {
  className: styles.tokens__market,
  href: "https://1inch.exchange/#/ETH/SAN",
  rel: "noopener noreferrer",
  target: "_blank"
}, "1inch"))));

export default SettingsGetTokens;
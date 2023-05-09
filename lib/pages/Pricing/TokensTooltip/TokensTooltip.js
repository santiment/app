import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import Panel from '@santiment-network/ui/Panel/Panel';
import styles from './TokensTooltip.module.css';

const TokensTooltip = () => /*#__PURE__*/React.createElement("div", {
  className: styles.sanTokens
}, /*#__PURE__*/React.createElement(Tooltip, {
  on: "click",
  trigger: /*#__PURE__*/React.createElement("div", {
    className: styles.tooltipTrigger
  }, /*#__PURE__*/React.createElement("span", null, "Holding 1000 SAN tokens will result in a 20% discount on all plans"), /*#__PURE__*/React.createElement(Icon, {
    type: "question-round",
    className: styles.icon
  })),
  position: "bottom"
}, /*#__PURE__*/React.createElement(Panel, {
  padding: true,
  className: styles.tooltip
}, /*#__PURE__*/React.createElement("p", {
  className: styles.text
}, /*#__PURE__*/React.createElement("b", null, "Holding 1000 SAN tokens will result in a 20% discount on all plans")), /*#__PURE__*/React.createElement("ul", {
  className: styles.list
}, /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "Buy 1000 or more SAN tokens (", /*#__PURE__*/React.createElement("a", {
  rel: "noopener noreferrer",
  target: "_blank",
  href: "https://academy.santiment.net/san-tokens/how-to-buy-san/"
}, "here's how"), ")"), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "Log in to Sanbase (", /*#__PURE__*/React.createElement("a", {
  rel: "noopener noreferrer",
  target: "_blank",
  href: "https://app.santiment.net/"
}, "https://app.santiment.net/"), "). If you don\u2019t have a Sanbase account, you can create one with email or MetaMask", ' '), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "After logging in to Sanbase, head to", /*#__PURE__*/React.createElement("a", {
  rel: "noopener noreferrer",
  target: "_blank",
  href: "https://app.santiment.net/account"
}, ' ', "Account Settings"), ' ', "and connect your account with your MetaMask wallet"), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "Refresh this page and proceed with your purchase"), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "Our system checks your Sanbase account for 1000+ SAN during the checkout, and automatically applies a 20% discount", ' ')), /*#__PURE__*/React.createElement("p", {
  className: styles.text
}, /*#__PURE__*/React.createElement("b", null, "Note: "), "To claim the 20% discount, you just need to hold/HODL enough SAN. The tokens still belong to you - our system simply checks if you have them in your wallet"))));

export default TokensTooltip;
import React from 'react';
import tokensSvg from './tokens.svg';
import ContactUs from '../../components/ContactUs/ContactUs';
import styles from './PayWithCrypto.module.css';

const PayWithCrypto = () => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("img", {
  src: tokensSvg,
  className: styles.tokensImg,
  alt: "Tokens"
}), /*#__PURE__*/React.createElement("div", {
  className: styles.info
}, /*#__PURE__*/React.createElement("div", {
  className: styles.title
}, "Pay with crypto"), /*#__PURE__*/React.createElement("a", {
  className: styles.description,
  rel: "noopener noreferrer",
  target: "_blank",
  href: "https://academy.santiment.net/products-and-plans/how-to-pay-with-crypto/"
}, "Burn SAN tokens or pay with DAI / ETH"), /*#__PURE__*/React.createElement(ContactUs, {
  variant: "ghost",
  className: styles.contactBtn,
  message: "Hello, I want to pay by crypto."
}, "Contact sales")));

export default PayWithCrypto;
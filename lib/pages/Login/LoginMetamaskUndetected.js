import React from 'react';
import Panel from '@santiment-network/ui/Panel/Panel';
import Icon from '@santiment-network/ui/Icon';
import styles from './LoginMetamaskUndetected.module.css';

const LoginMetamaskUndetected = () => {
  return /*#__PURE__*/React.createElement(Panel, {
    className: styles.undetected
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "metamask",
    className: styles.metamask
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.undetected__title
  }, "We can't detect Metamask!"), /*#__PURE__*/React.createElement("p", {
    className: styles.undetected__text
  }, "We can auth you with Metamask account. It's secure and easy."), /*#__PURE__*/React.createElement("div", {
    className: styles.undetected__bottom
  }, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://metamask.io/#how-it-works",
    className: styles.undetected__link
  }, "How Metamask works?"))));
};

export default LoginMetamaskUndetected;
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn';
import styles from './PaywallBanner.module.css';

const PaywallBanner = ({
  isMobile
}) => {
  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", {
      className: cx(styles.wrapper, 'body-2')
    }, /*#__PURE__*/React.createElement("h4", {
      className: "txt-m mrg-s mrg--b"
    }, "Why those data is hidden?"), /*#__PURE__*/React.createElement("div", {
      className: "mrg-m mrg--b"
    }, "To unlock the full potential of Santiment metrics you need to upgrade your account to PRO"), /*#__PURE__*/React.createElement(Link, {
      className: cx(styles.link, 'btn-1 btn--orange'),
      to: "/pricing"
    }, "Upgrade"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Why is some of the data hidden?"), /*#__PURE__*/React.createElement("div", {
    className: styles.desc
  }, "To get the full breakdown of our social metrics, upgrade your account to PRO!"), /*#__PURE__*/React.createElement(UpgradeBtn, {
    className: styles.button,
    variant: "fill"
  }));
};

export default PaywallBanner;
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { saveBoolean, getSavedBoolean } from 'san-webkit/lib/utils/localStorage';
import { useCustomerData } from './hooks/useCustomerData';
import { ReactComponent as TokensSvg } from './images/tokens.svg';
import { ReactComponent as CloseSvg } from './images/close.svg';
import styles from './SanTokenPopup.module.css';
const IS_DISCOVER_SAN_TOKEN_VIEWED = 'IS_DISCOVER_SAN_TOKEN_VIEWED';
const TIMEOUT = 4 * 1000;

const SanTokenPopup = () => {
  const {
    isLoggedIn
  } = useCustomerData();
  const [isOpen, setIsOpen] = useState(false);

  function handleClosePopup() {
    saveBoolean(IS_DISCOVER_SAN_TOKEN_VIEWED, true);
    setIsOpen(false);
  }

  const handleOpenPopup = () => setIsOpen(!getSavedBoolean(IS_DISCOVER_SAN_TOKEN_VIEWED));

  useEffect(() => {
    if (isOpen) return;
    const timeoutID = setTimeout(handleOpenPopup, TIMEOUT);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [isOpen]);
  if (!isLoggedIn || !isOpen) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.shadow
  }), /*#__PURE__*/React.createElement("div", {
    className: cx('row border box', styles['san-tokens'])
  }, /*#__PURE__*/React.createElement(TokensSvg, {
    className: styles['token-svg']
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.main
  }, /*#__PURE__*/React.createElement("div", {
    className: cx('body-2 txt-m mrg--b mrg-s', styles.title)
  }, "Discover SAN token"), /*#__PURE__*/React.createElement("div", {
    className: cx('body-3 c-waterloo mrg--b mrg-l', styles.info)
  }, "SAN tokens provide major discounts to all of Santiment's products. Explore our Academy & learn more!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: cx('btn-1 body-3 mrg--r mrg-l', styles.learn),
    href: "https://academy.santiment.net/san-tokens/how-to-buy-san-tokens/",
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: handleClosePopup
  }, "Learn about SAN token"))), /*#__PURE__*/React.createElement(CloseSvg, {
    className: cx('btn', styles.close),
    onClick: handleClosePopup
  })));
};

export default SanTokenPopup;
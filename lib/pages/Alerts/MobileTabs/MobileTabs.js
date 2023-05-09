import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Dialog from '@santiment-network/ui/Dialog';
import AlertRestrictionMessage from '../AlertRestrictionMessage/AlertRestrictionMessage';
import styles from './MobileTabs.module.css';

const MobileTabs = ({
  alertsRestrictions: {
    currentAmount,
    maxAmount,
    shouldHideRestrictionMessage
  },
  filter,
  explore,
  myAlerts
}) => {
  const [activeTab, setIsActiveTab] = useState(0);
  const [isOpen, setOpen] = useState(false);

  function handleChangeActiveTab(tab) {
    setIsActiveTab(tab);
  }

  return /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, 'relative')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.toolbar, 'row v-center justify fluid')
  }, /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn body-2 mrg-m mrg--r', activeTab === 0 && styles.active),
    onClick: () => handleChangeActiveTab(0)
  }, "Explore"), /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn body-2', activeTab === 1 && styles.active),
    onClick: () => handleChangeActiveTab(1)
  }, "My Alerts")), activeTab === 1 && /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, maxAmount <= 20 && /*#__PURE__*/React.createElement(Dialog, {
    open: isOpen,
    title: "My Alerts",
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    trigger: /*#__PURE__*/React.createElement("button", {
      className: cx(styles.btn, 'btn body-2 mrg-s mrg--r')
    }, /*#__PURE__*/React.createElement("span", {
      className: "c-black"
    }, currentAmount), "/", maxAmount),
    classes: {
      title: cx(styles.title, 'txt-m')
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.upgradeWrapper, 'column justify')
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "txt-b"
  }, currentAmount, " alerts"), " created out of ", maxAmount, ' ', "available. To unlock more alerts please upgrade your plan!"), /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: cx(styles.link, 'btn-1 btn--orange row hv-center fluid body-2 txt-m')
  }, "Upgrade the plan"))), filter)), !shouldHideRestrictionMessage && activeTab === 1 && /*#__PURE__*/React.createElement(AlertRestrictionMessage, null), /*#__PURE__*/React.createElement("div", null, activeTab === 0 ? explore : myAlerts));
};

export default MobileTabs;
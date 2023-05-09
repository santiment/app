import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import Panel from '@santiment-network/ui/Panel';
import Illustration from './Illustration';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import styles from './index.module.css';
const TRIAL_PROMPT_SHOWN = 'TRIAL_PROMPT_SHOWN';
const TIMEOUT = 60 * 1000;

const Checkmark = () => /*#__PURE__*/React.createElement("svg", {
  className: styles.check,
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  fill: "var(--jungle-green-light)"
}), /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M17.278 8.64a.5.5 0 01.013.707l-5.786 6a.5.5 0 01-.733-.014l-3.214-3.6a.5.5 0 01.746-.666l2.855 3.198 5.412-5.612a.5.5 0 01.707-.013z",
  fill: "#14C393"
}));

const TrialPromptDialog = () => {
  const {
    loading,
    isEligibleForSanbaseTrial
  } = useUserSubscriptionStatus();
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  useEffect(() => {
    const isShown = localStorage.getItem(TRIAL_PROMPT_SHOWN);
    if (!isEligibleForSanbaseTrial || isShown) return;
    const timeoutId = setTimeout(() => {
      open();
      localStorage.setItem(TRIAL_PROMPT_SHOWN, '+');
    }, TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, [isEligibleForSanbaseTrial]);
  if (loading || !isEligibleForSanbaseTrial) return null;
  return /*#__PURE__*/React.createElement(Dialog, {
    title: "",
    open: isOpen,
    preventCloseOnDimmedFromStart: true,
    onOpen: open,
    onClose: close,
    classes: styles
  }, /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, "Start your free trial"), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, /*#__PURE__*/React.createElement(Illustration, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.features
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.feature
  }, /*#__PURE__*/React.createElement(Checkmark, null), "Full historical and present-day data for 100+", /*#__PURE__*/React.createElement("br", null), "on-chain, social and development metrics"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature
  }, /*#__PURE__*/React.createElement(Checkmark, null), "Exclusive insights and weekly market", /*#__PURE__*/React.createElement("br", null), "reports from Santiment team"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature
  }, /*#__PURE__*/React.createElement(Checkmark, null), "Full access to our Spreadsheets plugin with", /*#__PURE__*/React.createElement("br", null), "dozens of pre-made templates")), /*#__PURE__*/React.createElement(Button, {
    as: Link,
    to: "/pricing",
    variant: "fill",
    accent: "positive",
    className: styles.btn,
    onClick: close
  }, "Start crypto journey"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "14 days free of Sanbase Pro, no charges untill the trial is ended")))));
};

export default TrialPromptDialog;
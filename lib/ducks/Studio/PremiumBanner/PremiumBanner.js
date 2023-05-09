import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import { useUser } from '../../../stores/user';
import { PATHS } from '../../../paths';
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn';
import styles from './PremiumBanner.module.css';
const WIDGET_KEY = 'PRO_STUDIO_WIDGET_KEY';

const PremiumBanner = () => {
  const {
    isPro,
    loading,
    isTrial
  } = useUserSubscriptionStatus();
  const {
    isLoggedIn
  } = useUser();
  const [show, setShow] = useState(false);
  const availableForUser = isPro && isTrial || !isPro && isLoggedIn;
  useEffect(() => {
    if (availableForUser && !loading) {
      setShow(!localStorage.getItem(WIDGET_KEY));
    }
  }, [availableForUser, loading]);

  if (!show) {
    return null;
  }

  function hide() {
    setShow(false);
    localStorage.setItem(WIDGET_KEY, true);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "crown",
    className: styles.crown
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Get premium data and market insights with Sanbase PRO"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Access all Santiment metrics, unlimited watchlists and alerts, Sanbase Screener, daily market analysis and much more!"), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(UpgradeBtn, {
    variant: 'fill',
    showCrown: false
  })), /*#__PURE__*/React.createElement("div", {
    onClick: hide
  }, /*#__PURE__*/React.createElement(Icon, {
    type: 'close-medium',
    className: styles.close
  }))));
};

export default PremiumBanner;
import React from 'react';
import cx from 'classnames';
import UpgradeBtn from '../../../../components/UpgradeBtn/UpgradeBtn';
import Panel from '@santiment-network/ui/Panel/Panel';
import proIcon from './../../../../assets/feed/pro-icon.svg';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import styles from './MakeProSubscriptionCard.module.css';
export const ProUpgradeBanner = ({
  classes
}) => /*#__PURE__*/React.createElement(Panel, {
  padding: true,
  className: cx(styles.card, classes.card)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.center
}, /*#__PURE__*/React.createElement("img", {
  src: proIcon,
  alt: "pro-icon",
  className: styles.icon
}), /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.title, classes.ProBannerTitle)
}, "Go PRO and get more data"), /*#__PURE__*/React.createElement("div", {
  className: cx(styles.description, classes.ProBannerDescription)
}, "Unlimited metrics, all types of alerts, handcrafted report and much more"))), /*#__PURE__*/React.createElement("div", {
  className: styles.right
}, /*#__PURE__*/React.createElement(UpgradeBtn, {
  className: cx(styles.upgrade, classes.ProBannerBtn),
  variant: "fill"
})));
ProUpgradeBanner.defaultProps = {
  classes: {}
};

const MakeProSubscriptionCard = ({
  classes = {}
}) => {
  const {
    loading,
    isPro
  } = useUserSubscriptionStatus();

  if (loading) {
    return 'Loading...';
  }

  if (isPro) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ProUpgradeBanner, {
    classes: classes
  });
};

export default MakeProSubscriptionCard;
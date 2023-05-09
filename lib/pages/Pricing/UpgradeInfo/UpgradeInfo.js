import React from 'react';
import cx from 'classnames';
import { InputWithIcon } from '@santiment-network/ui/Input';
import SubscriptionForm from '../../../components/SubscriptionForm/SubscriptionForm';
import styles from './UpgradeInfo.module.css';

const UpgradeInfo = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.ask, styles.bgSvg, styles.signSvg)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.askBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.askTitle, styles.sign)
  }, "Ready to get started? Sign up now!"), /*#__PURE__*/React.createElement(SubscriptionForm, {
    classes: styles,
    inputEl: InputWithIcon,
    icon: "mail",
    iconPosition: "left",
    hasSubscribed: false,
    subscriptionLabel: "Send me weekly updates from crypto market"
  })));
};

export default UpgradeInfo;
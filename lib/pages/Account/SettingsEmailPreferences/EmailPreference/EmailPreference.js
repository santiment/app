import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Toggle from '@santiment-network/ui/Toggle';
import { useUpdateUserSettings } from '../../../../stores/user/settings';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import styles from './EmailPreference.module.css';

const EmailPreference = ({
  settings,
  title,
  description,
  isPro,
  settingsPropName,
  notProText
}) => {
  const [updateUserSettings] = useUpdateUserSettings();
  const {
    isPro: isProStatus,
    isProPlus: isProPlusStatus
  } = useUserSubscriptionStatus();
  const emailPreferenceSetting = settings[settingsPropName];

  function handleUpdateEmailPreference() {
    updateUserSettings({
      [settingsPropName]: !emailPreferenceSetting
    });
  }

  const isDisabled = !isProStatus && !isProPlusStatus && notProText;
  return /*#__PURE__*/React.createElement("div", {
    className: "row fluid justify"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.textWrapper, 'column')
  }, /*#__PURE__*/React.createElement("div", {
    className: "row txt-r c-rhino"
  }, title, isPro && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.proBadge, 'mrg--l mrg-s caption txt-m c-white row v-center')
  }, "PRO")), /*#__PURE__*/React.createElement("div", {
    className: "c-waterloo"
  }, description, isDisabled && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: cx(styles.link, 'mrg--l mrg--r mrg-xs txt-m')
  }, "Update your Plan"), notProText))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Toggle, {
    isActive: emailPreferenceSetting,
    onClick: handleUpdateEmailPreference,
    disabled: isDisabled
  })));
};

export default EmailPreference;
import React from 'react';
import { Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import cx from 'classnames';
import Tabs from '@santiment-network/ui/Tabs';
import Button from '@santiment-network/ui/Button';
import { DesktopOnly, MobileOnly } from '../../components/Responsive';
import MobileHeader from './../../components/MobileHeader/MobileHeader';
import SettingsGeneral from './SettingsGeneral';
import SettingsConnections from './SettingsConnections';
import SettingsEmailPreferences from './SettingsEmailPreferences/SettingsEmailPreferences';
import SettingsNotifications from './SettingsNotifications';
import SettingsGetTokens from './SettingsGetTokens';
import SettingsAPIKeys from './SettingsAPIKeys';
import SettingsSessions from './SettingsSessions';
import SettingsSubscription from './SettingsSubscription';
import SettingsAffiliate from './AffiliateSettings/SettingsAffiliate';
import { useUser } from '../../stores/user';
import styles from './AccountPage.module.css';
export const ACCOUNT_PAGE_HASHES = {
  subscription: '#subscription',
  affiliate: '#affiliate'
};
const tabs = [{
  index: 1,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#general"
  }, "General")
}, {
  index: 2,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: ACCOUNT_PAGE_HASHES.affiliate
  }, "Affiliate")
}, {
  index: 3,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#connections"
  }, "Connections")
}, {
  index: 4,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#notifications"
  }, "Alert notifications")
}, {
  index: 5,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#email-preferences"
  }, "Email Preferences")
}, {
  index: 6,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#get-tokens"
  }, "Get tokens")
}, {
  index: 7,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#api-keys"
  }, "API keys")
}, {
  index: 8,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: "#sessions"
  }, "Sessions")
}, {
  index: 9,
  content: /*#__PURE__*/React.createElement(Link, {
    className: styles.tab,
    to: ACCOUNT_PAGE_HASHES.subscription
  }, "Subscription")
}];

const AccountPage = ({
  history,
  location
}) => {
  const {
    loading,
    user
  } = useUser();

  if (loading) {
    return null;
  }

  if (!user) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/login"
    });
  }

  const {
    hash
  } = location;
  const selectedTab = tabs.find(({
    hash: tabHash
  }) => tabHash === hash);
  const selectedIndex = selectedTab ? selectedTab.index : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper + ' page'
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "Account settings")), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
    title: "Account settings"
  })), /*#__PURE__*/React.createElement(Tabs, {
    className: cx(styles.tabs, 'row justify no-scrollbar'),
    classes: {
      tab: styles.tabWrapper
    },
    options: tabs,
    defaultSelectedIndex: selectedIndex
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(SettingsGeneral, user), /*#__PURE__*/React.createElement(SettingsAffiliate, null), /*#__PURE__*/React.createElement(SettingsConnections, null), /*#__PURE__*/React.createElement(SettingsNotifications, null), /*#__PURE__*/React.createElement(SettingsEmailPreferences, null), /*#__PURE__*/React.createElement(SettingsGetTokens, null), /*#__PURE__*/React.createElement(SettingsAPIKeys, null), /*#__PURE__*/React.createElement(SettingsSessions, null), /*#__PURE__*/React.createElement(SettingsSubscription, null)), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Button, {
    className: styles.logoutBtn,
    border: true,
    variant: "flat",
    accent: "negative",
    onClick: () => history.push('/logout')
  }, "Log out")), /*#__PURE__*/React.createElement("div", {
    className: styles.version
  }, "ver. ", process.env.REACT_APP_VERSION)));
};

export default AccountPage;
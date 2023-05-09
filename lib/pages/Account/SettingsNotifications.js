import React from 'react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import SettingsTelegramNotifications from './SettingsTelegramNotifications';
import SettingsEmailNotifications from './SettingsEmailNotifications';
import SettingsSonarWebPushNotifications from './SettingsSonarWebPushNotifications';
import { filterByChannels, useSignals } from '../../ducks/Signals/common/getSignals';
import { CHANNEL_TYPES } from '../../ducks/Signals/utils/constants';
import { useUserSettings } from '../../stores/user/settings';
import SignalLimits from './limits/SignalLimits';
import styles from './AccountPage.module.css';

const channelByTypeLength = (signals, type) => {
  return filterByChannels(signals, type).length;
};

const SignalsDescription = (mappedCount, allCount, channel, channelName = channel) => {
  if (mappedCount === 0) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Link, {
    to: '/alerts?channel=' + channel,
    className: styles.signalDescription
  }, `Manage ${channelName} alerts (${mappedCount}/${allCount})`);
};

const SettingsNotifications = () => {
  const {
    settings
  } = useUserSettings();
  const {
    alertsPerDayLimit
  } = settings;
  const {
    data: signals
  } = useSignals();
  const allCount = signals.length;
  const countWithEmail = channelByTypeLength(signals, CHANNEL_TYPES.Email);
  const countWithTelegram = channelByTypeLength(signals, CHANNEL_TYPES.Telegram);
  const countWithBrowserPush = channelByTypeLength(signals, CHANNEL_TYPES.Browser);
  return /*#__PURE__*/React.createElement(Settings, {
    id: "notifications",
    header: "Alert notifications"
  }, /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(SettingsEmailNotifications, {
    count: countWithEmail,
    description: SignalsDescription(countWithEmail, allCount, CHANNEL_TYPES.Email)
  })), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(SettingsTelegramNotifications, {
    count: countWithTelegram,
    description: SignalsDescription(countWithTelegram, allCount, CHANNEL_TYPES.Telegram)
  })), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(SettingsSonarWebPushNotifications, {
    count: countWithBrowserPush,
    description: SignalsDescription(countWithBrowserPush, allCount, CHANNEL_TYPES.Browser, 'web push')
  })), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(SignalLimits, {
    alertsPerDayLimit: alertsPerDayLimit,
    classes: styles
  })));
};

export default SettingsNotifications;
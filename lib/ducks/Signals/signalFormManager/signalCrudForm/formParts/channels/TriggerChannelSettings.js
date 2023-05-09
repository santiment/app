import React from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import EmailSetting from '../../../../../../pages/Account/EmailSetting';
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock';
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications';
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications';
import SettingsSonarWebPushNotifications from '../../../../../../pages/Account/SettingsSonarWebPushNotifications';
import { useDialogState } from '../../../../../../hooks/dialog';
import styles from './TriggerChannelSettings.module.css';
const DefaultTrigger = /*#__PURE__*/React.createElement("div", {
  className: styles.connect
}, "Enable in settings");

const TriggerChannelSettings = ({
  recheckBrowserNotifications,
  trigger = DefaultTrigger,
  showTrigger = true,
  showWebPush = true,
  showTelegram = true
}) => {
  const {
    closeDialog,
    openDialog,
    isOpened
  } = useDialogState();

  if (!showTrigger) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog, {
    open: isOpened,
    onClose: closeDialog,
    onOpen: openDialog,
    trigger: showTrigger && trigger,
    title: "Notification settings",
    classes: styles
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, /*#__PURE__*/React.createElement(EmailSetting, {
    classes: styles,
    hideIfEmail: true
  }), /*#__PURE__*/React.createElement(SettingsEmailNotifications, {
    classes: styles
  }), showTelegram && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConnectTelegramBlock, {
    classes: styles
  }), /*#__PURE__*/React.createElement(SettingsTelegramNotifications, {
    classes: styles
  })), showWebPush && /*#__PURE__*/React.createElement(SettingsSonarWebPushNotifications, {
    classes: styles,
    className: styles.notifications,
    recheckBrowserNotifications: recheckBrowserNotifications
  }))));
};

export default TriggerChannelSettings;
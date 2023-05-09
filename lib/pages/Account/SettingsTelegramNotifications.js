import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import Toggle from '@santiment-network/ui/Toggle';
import AlertTooltip from '../../components/AlertTooltip/AlertTooltip';
import { useUpdateUserNotifications, useUserSettings } from '../../stores/user/settings';
import styles from './AccountPage.module.css';

const SettingsTelegramNotifications = ({
  classes = {},
  description,
  count
}) => {
  const {
    settings: {
      alertNotifyTelegram,
      hasTelegramConnected
    }
  } = useUserSettings();
  const [update] = useUpdateUserNotifications();
  return /*#__PURE__*/React.createElement("div", {
    className: cx(classes.container, styles.settingBlock, count < 1 && styles.noCount)
  }, /*#__PURE__*/React.createElement(Label, {
    className: cx(classes.left, 'row v-center', styles.label)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mrg--r mrg-xs"
  }, "Telegram notifications"), count > 0 && /*#__PURE__*/React.createElement(AlertTooltip, {
    isVisible: !alertNotifyTelegram,
    content: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "txt-m"
    }, "Telegram notifications are disabled!"), ' ', /*#__PURE__*/React.createElement("span", {
      className: styles.contentText
    }, "This means you will not receive Telegram notifications when this alert is triggered.")),
    tooltipClassname: styles.tooltipWidth
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.setting__right, classes.right)
  }, description, hasTelegramConnected ? /*#__PURE__*/React.createElement(Toggle, {
    isActive: alertNotifyTelegram,
    onClick: () => update({
      alertNotifyTelegram: !alertNotifyTelegram
    })
  }) : 'Please connect to telegram bot to enable notifications'));
};

export default SettingsTelegramNotifications;
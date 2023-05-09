import React, { useCallback, useEffect, useState } from 'react';
import Icon from '@santiment-network/ui/Icon';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import AlertTooltip, { ErrorTrigger } from '../../../../components/AlertTooltip/AlertTooltip';
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive';
import { useUserSettings } from '../../../../stores/user/settings';
import { getSanSonarSW } from '../../../../pages/Account/SettingsSonarWebPushNotifications';
import { capitalizeStr } from '../../../../utils/utils';
import styles from './AlertChannelsTooltip.module.css';

const AlertChannelsTooltip = ({
  signal,
  isPreview
}) => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const {
    settings: {
      alertNotifyTelegram: isTelegramConnected,
      alertNotifyEmail: isEmailConnected
    }
  } = useUserSettings();
  const {
    settings: {
      channel
    }
  } = signal;
  const checkPushAvailability = useCallback(() => {
    navigator.serviceWorker && navigator.serviceWorker.getRegistrations && navigator.serviceWorker.getRegistrations().then(registrations => setIsPushEnabled(!!getSanSonarSW(registrations)));
  }, [setIsPushEnabled]);
  useEffect(() => {
    checkPushAvailability();
  }, []);
  const hasUncheckedChannels = !isPushEnabled && channel.includes('push') || !isEmailConnected && channel.includes('email') || !isTelegramConnected && channel.includes('telegram');
  const channelItems = Array.isArray(channel) ? channel : [channel];
  const channelTitles = channelItems.map(item => {
    if (typeof item === 'string') {
      return capitalizeStr(item);
    }

    if ('telegram_channel' in item) {
      return 'Telegram Channel';
    }

    if ('webhook' in item) {
      return 'Webhook';
    }

    return item;
  });

  if (!hasUncheckedChannels) {
    return /*#__PURE__*/React.createElement("div", {
      className: cx('row hv-center mrg--l mrg-l', styles.wrapper)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "bell",
      className: cx('btn', styles.btn)
    }), isPreview && /*#__PURE__*/React.createElement("div", {
      className: cx('line-clamp body-3 c-waterloo mrg-s mrg--l', styles.text, isPreview && cx(styles.preview, 'nowrap mrg-s mrg--l body-2'))
    }, channelTitles.join(', ')), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
      className: cx('line-clamp body-3 c-waterloo mrg--l mrg-s', styles.text)
    }, channelTitles.join(', '))));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapperError, 'row hv-center mrg--l mrg-l')
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(AlertTooltip, {
    isVisible: true,
    type: "error",
    content: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "txt-m"
    }, "Your notifications are disabled!"), ' ', /*#__PURE__*/React.createElement("span", {
      className: styles.contentText
    }, "This means you will not receive information when this alert is triggered. To enable notifications, update your"), ' ', /*#__PURE__*/React.createElement(Link, {
      to: "/account#notifications",
      className: cx(styles.link, styles.tooltipLink)
    }, "Account Settings!")),
    tooltipClassname: styles.tooltip
  })), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement(ErrorTrigger, null), isPreview && /*#__PURE__*/React.createElement("span", {
    className: "mrg-s mrg--l body-2"
  }, "Disabled"))));
};

export default AlertChannelsTooltip;
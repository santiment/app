import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Message from '@santiment-network/ui/Message';
import TriggerChannelSettings from './TriggerChannelSettings';
import FormikCheckbox from '../../../../../../components/formik-santiment-ui/FormikCheckbox';
import { CHANNEL_NAMES } from '../../../../utils/constants';
import InputLink from '../../../../../../components/InputLink/InputLink';
import { findWebHook, isWebhookChannel, useChannelTypes, useDisabledChannels } from './hooks';
import { useIsBetaMode } from '../../../../../../stores/ui';
import { refetchUserSettings, useUserSettings } from '../../../../../../stores/user/settings';
import styles from '../../signal/TriggerForm.module.css';
const CHANNELS = [CHANNEL_NAMES.Email, CHANNEL_NAMES.Telegram, CHANNEL_NAMES.Browser, CHANNEL_NAMES.Webhook];
const REFETCH_TELEGRAM_TIMEOUT = 2000;

const checkAndAdd = (required, channels, flag, chType) => {
  if (!flag && channels.some(type => type === chType)) {
    required.push(chType);
  }

  return required;
};

const checkIn = (channels, flag, chType) => {
  if (!flag) {
    return channels.filter(item => item !== chType);
  }

  return channels;
};

const TriggerFormChannels = ({
  channels,
  errors,
  setFieldValue,
  isNew
}) => {
  const {
    settings: {
      isTelegramAllowAlerts: isTelegramConnected,
      isEmailAllowAlerts: isEmailConnected,
      hasTelegramConnected
    }
  } = useUserSettings();
  const [webhook, setWebhook] = useState('');
  const isBeta = useIsBetaMode();
  const [requiredChannels, setRequiredChannels] = useState([]);
  const {
    disabledChannels,
    calculateDisabledChannels,
    recheckBrowserNotifications,
    isWebPushEnabled
  } = useDisabledChannels({
    channels,
    isBeta,
    isTelegramConnected,
    isEmailConnected
  });
  const {
    isActive,
    isDisabled,
    isRequired
  } = useChannelTypes({
    channels,
    disabledChannels,
    requiredChannels
  });
  useEffect(() => {
    let newChannels = channels;

    if (isNew) {
      newChannels = checkIn(newChannels, isTelegramConnected, CHANNEL_NAMES.Telegram);
      newChannels = checkIn(newChannels, isEmailConnected, CHANNEL_NAMES.Email);
    }

    const active = newChannels.filter(channel => !isDisabled(channel));
    setFieldValue('channels', active);
  }, [isTelegramConnected, isEmailConnected]);
  useEffect(() => {
    calculateDisabledChannels();
    let required = [];
    required = checkAndAdd(required, channels, isTelegramConnected, CHANNEL_NAMES.Telegram);
    required = checkAndAdd(required, channels, isEmailConnected, CHANNEL_NAMES.Email);
    required = checkAndAdd(required, channels, isWebPushEnabled, CHANNEL_NAMES.Browser);
    setRequiredChannels(required);
  }, [isTelegramConnected, isEmailConnected, isWebPushEnabled]);
  const onWebhookChange = useCallback(e => {
    const channel = findWebHook(channels);
    const val = e.target.value;

    if (channel) {
      channel.webhook = val;
      setFieldValue('channels', channels);
    } else {
      setFieldValue('channels', [...channels, {
        webhook: val
      }]);
    }

    setWebhook(val);
  }, [channels, setFieldValue]);
  const addOrRemove = useCallback((channel, flag) => {
    const enabled = channels.indexOf(channel) !== -1;

    if (enabled && flag === true) {
      return;
    }

    if (!enabled && flag === false) {
      return;
    }

    let newChannels = [];

    if (enabled) {
      newChannels = channels.filter(item => item !== channel);
    } else {
      newChannels = [...channels, channel];
    }

    setFieldValue('channels', newChannels);
  }, [channels, setFieldValue]);
  const toggleChannel = useCallback((channel, flag) => {
    switch (channel) {
      case CHANNEL_NAMES.Webhook:
        {
          let newChannels = [];
          const whChannel = findWebHook(channels);

          if (!whChannel) {
            newChannels = [...channels, {
              webhook
            }];
          } else {
            newChannels = channels.filter(item => !isWebhookChannel(item));
          }

          setFieldValue('channels', newChannels);
          break;
        }

      default:
        {
          addOrRemove(channel);
        }
    }
  }, [channels, setFieldValue, addOrRemove]);
  useEffect(() => {
    if (!channels.length) {
      return;
    }

    if (!webhook) {
      const whChannel = findWebHook(channels);

      if (whChannel) {
        setWebhook(whChannel.webhook);
      }
    }

    const active = channels.filter(channel => !isDisabled(channel));

    if (!channels.some(channel => active.indexOf(channel) !== -1)) {
      setFieldValue('channels', active);
    }
  }, [channels]);
  useEffect(() => {
    isNew && addOrRemove(CHANNEL_NAMES.Telegram, isTelegramConnected);
  }, [isTelegramConnected]);
  useEffect(() => {
    isNew && addOrRemove(CHANNEL_NAMES.Email, isEmailConnected);
  }, [isEmailConnected]);
  useEffect(() => {
    let interval;

    if (!hasTelegramConnected) {
      interval = setInterval(() => {
        if (!hasTelegramConnected) {
          refetchUserSettings();
        }
      }, REFETCH_TELEGRAM_TIMEOUT);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.rowSingle)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.Field, styles.fieldFilled)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.notifyBlock
  }, CHANNELS.map(channel => {
    if (channel === CHANNEL_NAMES.Browser && !isBeta) {
      return null;
    }

    const isWebhook = channel === CHANNEL_NAMES.Webhook;
    return /*#__PURE__*/React.createElement("div", {
      className: cx(styles.channel, isWebhook && styles.webhook),
      key: channel
    }, /*#__PURE__*/React.createElement(ChannelCheckbox, {
      channel: channel,
      isActive: isActive,
      isDisabled: isDisabled,
      toggleChannel: toggleChannel,
      isRequired: isRequired(channel),
      recheckBrowserNotifications: recheckBrowserNotifications,
      isConnectable: !isWebhook
    }), isWebhook && /*#__PURE__*/React.createElement(InputLink, {
      name: "webhook",
      disabled: !findWebHook(channels),
      value: webhook,
      onChange: onWebhookChange,
      className: styles.inputLink
    }));
  })), errors.channels && /*#__PURE__*/React.createElement(ErrorMessage, {
    message: errors.channels
  })));
};

const ChannelCheckbox = ({
  channel,
  toggleChannel,
  isActive,
  isDisabled,
  isRequired,
  recheckBrowserNotifications,
  isConnectable = true
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.checkbox
  }, /*#__PURE__*/React.createElement(FormikCheckbox, {
    className: styles.checkboxBlock,
    name: 'checkBox' + channel,
    disabled: isDisabled(channel),
    isActive: isActive(channel),
    label: isRequired ? '' : channel,
    onClick: () => {
      toggleChannel(channel);
    }
  }), isConnectable && /*#__PURE__*/React.createElement(TriggerChannelSettings, {
    showTrigger: isRequired,
    recheckBrowserNotifications: recheckBrowserNotifications,
    trigger: /*#__PURE__*/React.createElement("div", {
      className: styles.requiredChannelExplanation
    }, "Enable ", channel, " alerts")
  }));
};

const ErrorMessage = ({
  message,
  recheckBrowserNotifications,
  channel
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.messages
}, /*#__PURE__*/React.createElement(Message, {
  variant: "warn"
}, message || /*#__PURE__*/React.createElement(TriggerChannelSettings, {
  trigger: /*#__PURE__*/React.createElement("div", {
    className: styles.openSettings
  }, "Please, open your", ' ', /*#__PURE__*/React.createElement(Link, {
    to: "#",
    className: styles.link
  }, "account settings"), ' ', "and enable", ' ', /*#__PURE__*/React.createElement(Link, {
    className: styles.link,
    to: "#"
  }, channel), ' ', "notifications"),
  recheckBrowserNotifications: recheckBrowserNotifications
})));

export default TriggerFormChannels;
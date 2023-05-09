import React from 'react';
import { useHistory } from 'react-router-dom';
import RemoveSignalButton from '../../../components/SignalCard/controls/RemoveSignalButton';
import NotificationActions from '../../../components/NotificationActions/NotificationActions';
import { canOpenTrigger } from '../../../components/SignalCard/card/utils';
import { useUserSettings } from '../../../stores/user/settings';

const SignalNotificationActions = ({
  signal,
  toLink
}) => {
  const {
    settings: {
      alertNotifyTelegram: isTelegramConnected,
      alertNotifyEmail: isEmailConnected
    }
  } = useUserSettings();
  const history = useHistory();
  const {
    id,
    settings
  } = signal;
  const isOpenLink = canOpenTrigger(settings);
  const hasUncheckedChannels = !isEmailConnected && settings.channel.includes('email') || !isTelegramConnected && settings.channel.includes('telegram');

  if (hasUncheckedChannels && id) {
    setTimeout(() => {
      history.push(`/alerts/${id}`);
    }, 1000);
  }

  return /*#__PURE__*/React.createElement(NotificationActions, {
    id: id,
    link: toLink,
    isOpenLink: isOpenLink,
    undoTrigger: RemoveSignalButton
  });
};

export default SignalNotificationActions;
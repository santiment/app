import React, { useEffect, useState } from 'react';
import SourceToggle from '../SourceToggle';
import InputLink, { validURL } from '../../../../../../../../../components/InputLink/InputLink';

const WebhookToggle = ({
  disabled,
  isActive,
  onChange,
  value,
  setValue,
  webhook
}) => {
  const [webhookUrl, setWebhookUrl] = useState(webhook ? webhook.webhook : '');
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (webhookUrl && validURL(webhookUrl)) {
      setIsError(false);
      const updatedChannels = value.filter(item => typeof item === 'string' ? item : !('webhook' in item));
      setValue([...updatedChannels, {
        webhook: webhookUrl
      }]);
    } else {
      setIsError(!disabled);
    }
  }, [webhookUrl, disabled]);
  return /*#__PURE__*/React.createElement(SourceToggle, {
    disabled: disabled,
    onChange: onChange,
    isActive: isActive,
    label: "Webhook URL",
    isWebhook: true
  }, /*#__PURE__*/React.createElement(InputLink, {
    disabled: disabled,
    errorText: isError && 'Invalid webhook URL',
    value: webhookUrl,
    onChange: e => setWebhookUrl(e.target.value)
  }));
};

export default WebhookToggle;
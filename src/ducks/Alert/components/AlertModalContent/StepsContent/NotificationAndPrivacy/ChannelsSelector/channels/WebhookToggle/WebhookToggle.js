import React, { useEffect, useState } from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import InputLink, {
  validURL
} from '../../../../../../../../../components/InputLink/InputLink'
import styles from '../../ChannelsSelector.module.scss'

const WebhookToggle = ({
  disabled,
  isActive,
  onChange,
  value,
  setValue,
  webhook
}) => {
  const [webhookUrl, setWebhookUrl] = useState(webhook ? webhook.webhook : '')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (webhookUrl && validURL(webhookUrl)) {
      setIsError(false)

      const updatedChannels = value.filter(item =>
        typeof item === 'string' ? item : !('webhook' in item)
      )

      setValue([
        ...updatedChannels,
        {
          webhook: webhookUrl
        }
      ])
    } else {
      setIsError(!disabled)
    }
  }, [webhookUrl, disabled])

  return (
    <div className={styles.inputsRow}>
      <Checkbox id='webhookChannel' isActive={isActive} onClick={onChange} />
      <div className={styles.checkInfo}>
        <div className={styles.labelRow}>Webhook URL</div>
        <div>
          <InputLink
            className={styles.input}
            disabled={disabled}
            errorText={isError && 'Invalid webhook URL'}
            value={webhookUrl}
            onChange={e => setWebhookUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default WebhookToggle

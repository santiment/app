import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import Input from '@santiment-network/ui/Input'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import { useCheckTelegramValid } from '../../../../../../../hooks/useCheckTelegramValid'
import styles from '../../ChannelsSelector.module.scss'

const TelegramToggle = ({
  disabled,
  isActive,
  onChange,
  telegram,
  value,
  setValue
}) => {
  const [telegramChat, setTelegramChat] = useState(
    telegram ? telegram.telegram_channel : ''
  )
  const { data } = useCheckTelegramValid({
    chatId: telegramChat
  })

  useEffect(() => {
    if (data && data.isTelegramChatIdValid) {
      const updatedChannels = value.filter(item =>
        typeof item === 'string'
          ? item !== 'telegram'
          : !('telegram_channel' in item)
      )

      setValue([
        ...updatedChannels,
        {
          telegram_channel: telegramChat
        }
      ])
    }
  }, [telegramChat, data])

  const isError = telegramChat && data && !data.isTelegramChatIdValid

  return (
    <div className={cx(styles.inputsRow, disabled && styles.disabled)}>
      <Checkbox
        id='telegramChannel'
        disabled={disabled}
        isActive={!disabled && isActive}
        onClick={!disabled ? onChange : null}
      />
      <div className={styles.checkInfo}>
        <div className={styles.labelRow}>
          Telegram
          <TriggerChannelSettings
            showTrigger={disabled}
            trigger={
              <div className={styles.channelSettingsTrigger}>
                Enable notifications
              </div>
            }
          />
        </div>
        <div>
          <Input
            value={telegramChat}
            onChange={e => setTelegramChat(e.target.value)}
            className={styles.input}
            disabled={!isActive || disabled}
            isError={isError}
            errorText={isError && 'Invalid telegram ID'}
          />
        </div>
      </div>
    </div>
  )
}

export default TelegramToggle

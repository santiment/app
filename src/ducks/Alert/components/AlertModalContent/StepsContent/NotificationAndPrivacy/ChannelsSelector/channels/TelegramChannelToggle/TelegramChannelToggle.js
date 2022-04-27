import React, { useEffect, useRef, useState } from 'react'
import Input from '@santiment-network/ui/Input'
import Tooltip from '@santiment-network/ui/Tooltip'
import SourceToggle from '../SourceToggle'
import AlertMessage from '../../../../../../../../../components/Alert/AlertMessage'
import { useCheckTelegramValid } from '../../../../../../../hooks/useCheckTelegramValid'
import { useOnClickOutside } from '../../../../../../../../../hooks/click'
import telegramChannelInfo from '../../../../../../../../../assets/tooltips/telegram_channel_info.png'
import styles from './TelegramChannelToggle.module.scss'

const TelegramChannelToggle = ({
  disabled,
  isActive,
  onChange,
  value,
  setValue,
  telegramChannel,
}) => {
  const [hasError, setHasError] = useState(false)
  const [shown, setShown] = useState(false)
  const [telegramChat, setTelegramChat] = useState(
    telegramChannel ? telegramChannel.telegram_channel : '',
  )
  const ref = useRef()
  useOnClickOutside(ref, () => setShown(false))

  const { data } = useCheckTelegramValid({
    chatId: telegramChat,
  })

  useEffect(() => {
    if (data && data.isTelegramChatIdValid) {
      setHasError(false)
      const updatedChannels = value.filter((item) =>
        typeof item === 'string' ? item : !('telegram_channel' in item),
      )

      setValue([
        ...updatedChannels,
        {
          telegram_channel: telegramChat,
        },
      ])
    }
  }, [telegramChat, data])

  const isError = telegramChat && data && !data.isTelegramChatIdValid

  return (
    <div className={styles.wrapper}>
      <SourceToggle
        disabled={disabled}
        onChange={onChange}
        isActive={isActive}
        label='Telegram public channel'
        isWebhook
        tooltipText='Receive notification in your public telegram channel. First, you need to add a channel name to the input. Second, to grant access for Santiment Signals bot inside the telegram channel. Detailed instructions will appear below.'
      >
        <Input
          placeholder='@Channel name'
          disabled={disabled}
          errorText={isError && 'Invalid Channel'}
          value={telegramChat}
          onChange={(e) => setTelegramChat(e.target.value)}
          onBlur={() => !telegramChat && setHasError(true)}
        />
      </SourceToggle>
      {isActive && (
        <div className={styles.description}>
          To allow notification for your telegram channel. Open your telegram channel, press info,
          go to Administrators, add Admin. Search for Santiment Signals bot. The Signals bot must be
          made an admin of the channel with only Post Messages privileges.{' '}
          <span className={styles.screenshot} onClick={() => setShown((prev) => !prev)}>
            Show a screenshot
          </span>
          <Tooltip trigger={<div />} shown={shown} position='bottom' className={styles.tooltip}>
            <div className={styles.tooltip__content} ref={ref}>
              <img src={telegramChannelInfo} alt='' className={styles.tooltip__img} />
            </div>
          </Tooltip>
        </div>
      )}
      {hasError && isActive && (
        <AlertMessage
          className={styles.error}
          error
          text='Add channel name and grant access for the bot'
        />
      )}
    </div>
  )
}

export default TelegramChannelToggle

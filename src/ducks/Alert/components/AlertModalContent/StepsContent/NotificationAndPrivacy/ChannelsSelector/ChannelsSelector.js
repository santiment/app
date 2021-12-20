import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import Message from '@santiment-network/ui/Message'
import EmailToggle from './channels/EmailToggle/EmailToggle'
import TelegramToggle from './channels/TelegramToggle/TelegramToggle'
import PushToggle from './channels/PushToggle/PushToggle'
import WebhookToggle from './channels/WebhookToggle/WebhookToggle'
import { useUserSettings } from '../../../../../../../stores/user/settings'
import { useUser } from '../../../../../../../stores/user'
import { getSanSonarSW } from '../../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import { getChannelsTitles } from '../../../../../utils'
import styles from './ChannelsSelector.module.scss'

const ChannelsSelector = () => {
  const [, { value }, { setValue }] = useField('settings.channel')
  const [isPushDisabled, setIsPushDisabled] = useState(false)
  const { user } = useUser()
  const {
    settings: {
      alertNotifyTelegram: isTelegramConnected,
      alertNotifyEmail: isEmailConnected
    }
  } = useUserSettings()

  const channels = useMemo(() => {
    const channelTitles = getChannelsTitles(value)

    return new Set(channelTitles)
  }, [value])

  const webhookObj = useMemo(
    () =>
      value.find(
        channel =>
          typeof channel !== 'string' && 'webhook' in channel && channel
      ),
    [value]
  )

  const telegramObj = useMemo(
    () =>
      value.find(
        channel =>
          typeof channel !== 'string' &&
          'telegram_channel' in channel &&
          channel
      ),
    [value]
  )

  const checkPushAvailability = useCallback(() => {
    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker
        .getRegistrations()
        .then(registrations => setIsPushDisabled(!getSanSonarSW(registrations)))
  }, [setIsPushDisabled])

  const updateDefaultSettings = useCallback(() => {
    const selected = []

    if (isEmailConnected) {
      selected.push('email')
    }
    if (isTelegramConnected) {
      selected.push('telegram')
    }

    setValue(selected)
  }, [setValue, isEmailConnected, isTelegramConnected])

  useEffect(() => {
    if (value.length === 0) {
      updateDefaultSettings()
    }

    checkPushAvailability()
  }, [])

  const handleChangeChannels = useCallback(
    channelTitle => () => {
      if (channels.has(channelTitle)) {
        if (channelTitle === 'telegram') {
          const updatedChannels = value.filter(item =>
            typeof item === 'string'
              ? item !== 'telegram'
              : !('telegram_channel' in item)
          )

          setValue(updatedChannels)
        } else if (channelTitle === 'webhook') {
          const updatedChannels = value.filter(item =>
            typeof item === 'string' ? item : !('webhook' in item)
          )

          setValue(updatedChannels)
        } else {
          setValue(value.filter(item => item !== channelTitle))
        }
      } else {
        if (channelTitle === 'webhook') {
          setValue([...value, { webhook: '' }])
        } else {
          setValue([...value, channelTitle])
        }
      }
    },
    [setValue, value]
  )

  return (
    <div className={styles.wrapper}>
      <EmailToggle
        email={user ? user.email : ''}
        disabled={!isEmailConnected}
        isActive={channels.has('email')}
        onChange={handleChangeChannels('email')}
      />
      <TelegramToggle
        disabled={!isTelegramConnected}
        isActive={channels.has('telegram') || channels.has('telegram_channel')}
        onChange={handleChangeChannels('telegram')}
        telegram={telegramObj}
        value={value}
        setValue={setValue}
      />
      <PushToggle
        disabled={isPushDisabled}
        checkPushAvailability={checkPushAvailability}
        isActive={channels.has('web_push')}
        onChange={handleChangeChannels('web_push')}
      />
      <WebhookToggle
        disabled={!channels.has('webhook')}
        isActive={channels.has('webhook')}
        onChange={handleChangeChannels('webhook')}
        webhook={webhookObj}
        value={value}
        setValue={setValue}
      />
      {value.length === 0 && (
        <Message variant='warn'>You must setup notification channel</Message>
      )}
    </div>
  )
}

export default ChannelsSelector

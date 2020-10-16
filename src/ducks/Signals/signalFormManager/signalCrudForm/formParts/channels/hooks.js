import { useCallback, useEffect, useState } from 'react'
import { getSanSonarSW } from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import { CHANNEL_NAMES } from '../../../../utils/constants'

export const getDisabled = ({
  isEmailConnected,
  isTelegramConnected,
  isWebPushEnabled
}) => {
  const disabled = []

  if (!isEmailConnected) {
    disabled.push(CHANNEL_NAMES.Email)
  }
  if (!isTelegramConnected) {
    disabled.push(CHANNEL_NAMES.Telegram)
  }
  if (!isWebPushEnabled) {
    disabled.push(CHANNEL_NAMES.Browser)
  }

  return disabled
}

export const findWebHook = channels => {
  return channels.find(item => {
    return isWebhookChannel(item)
  })
}

export const isActiveInChannels = (channels, channel) => {
  switch (channel) {
    case CHANNEL_NAMES.Webhook: {
      return findWebHook(channels)
    }
    default: {
      return channels.some(active => active === channel)
    }
  }
}

export const isWebhookChannel = channel => {
  return (
    typeof channel === 'object' &&
    (channel.hasOwnProperty('webhook') || Object.keys(channel).length === 0)
  )
}

export const useDisabledChannels = ({
  channels,
  isTelegramConnected,
  isEmailConnected,
  isBeta
}) => {
  const [isWebPushEnabled, setWebPushEnabled] = useState(true)
  const [disabledChannels, setDisabledChannels] = useState([])

  const calculateDisabledChannels = useCallback(
    () => {
      const disabled = getDisabled({
        isTelegramConnected,
        isWebPushEnabled,
        isEmailConnected
      })
      setDisabledChannels(disabled)
    },
    [isEmailConnected, isWebPushEnabled, isTelegramConnected]
  )

  const recheckBrowserNotifications = useCallback(
    () => {
      navigator.serviceWorker &&
        navigator.serviceWorker.getRegistrations &&
        navigator.serviceWorker.getRegistrations().then(registrations => {
          const sw = getSanSonarSW(registrations)
          const hasServiceWorker = !!sw

          setWebPushEnabled(hasServiceWorker)
          calculateDisabledChannels && calculateDisabledChannels()
        })
    },
    [setWebPushEnabled, calculateDisabledChannels]
  )

  useEffect(
    () => {
      if (isBeta) {
        recheckBrowserNotifications()
      }
    },
    [isWebPushEnabled, channels]
  )

  return {
    recheckBrowserNotifications,
    isWebPushEnabled,
    disabledChannels,
    calculateDisabledChannels
  }
}

export const useChannelTypes = ({
  channels,
  requiredChannels,
  disabledChannels
}) => {
  const isActive = useCallback(
    channel => {
      return isActiveInChannels(channels, channel)
    },
    [channels]
  )

  const isRequired = useCallback(
    channel => {
      return (
        requiredChannels.some(required => required === channel) ||
        disabledChannels.some(disabled => disabled === channel)
      )
    },
    [requiredChannels, disabledChannels]
  )

  const isDisabled = useCallback(
    channel => {
      return disabledChannels.some(disabled => disabled === channel)
    },
    [disabledChannels]
  )

  return { isActive, isRequired, isDisabled }
}

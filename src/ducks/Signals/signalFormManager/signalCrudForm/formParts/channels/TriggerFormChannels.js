import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import Message from '@santiment-network/ui/Message'
import TriggerChannelSettings from './TriggerChannelSettings'
import { getSanSonarSW } from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import FormikCheckbox from '../../../../../../components/formik-santiment-ui/FormikCheckbox'
import { CHANNEL_NAMES } from '../../../../utils/constants'
import InputLink from '../../../../../../components/InputLink/InputLink'
import styles from '../../signal/TriggerForm.module.scss'

const CHANNELS = [
  CHANNEL_NAMES.Email,
  CHANNEL_NAMES.Telegram,
  CHANNEL_NAMES.Browser,
  CHANNEL_NAMES.Webhook
]

export const findWebHook = channels => {
  return channels.find(item => {
    return isWebhookChannel(item)
  })
}

export const isWebhookChannel = channel => {
  return (
    typeof channel === 'object' &&
    (channel.hasOwnProperty('webhook') || Object.keys(channel).length === 0)
  )
}

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

const TriggerFormChannels = ({
  channels,
  errors,
  isTelegramConnected,
  isEmailConnected,
  isBeta,
  setFieldValue,
  isNew
}) => {
  const [isWebPushEnabled, setWebPushEnabled] = useState(true)
  const [webhook, setWebhook] = useState('')
  const [disabledChannels, setDisabledChannels] = useState([])

  const [requiredChannels, setRequiredChannels] = useState([])

  const isDisabled = useCallback(
    channel => {
      return disabledChannels.some(disabled => disabled === channel)
    },
    [disabledChannels]
  )

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
          calculateDisabledChannels()
        })
    },
    [setWebPushEnabled, calculateDisabledChannels]
  )

  useEffect(
    () => {
      let newChannels = channels
      if (isNew) {
        if (!isTelegramConnected) {
          newChannels = newChannels.filter(
            item => item !== CHANNEL_NAMES.Telegram
          )
        }

        if (!isEmailConnected) {
          newChannels = newChannels.filter(item => item !== CHANNEL_NAMES.Email)
        }
      }

      const active = newChannels.filter(channel => !isDisabled(channel))

      setFieldValue('channels', active)
    },
    [isTelegramConnected, isEmailConnected]
  )

  useEffect(
    () => {
      if (isBeta) {
        recheckBrowserNotifications()
      }
    },
    [isWebPushEnabled, channels]
  )

  useEffect(
    () => {
      calculateDisabledChannels()
      let required = []
      if (
        !isTelegramConnected &&
        channels.some(type => type === CHANNEL_NAMES.Telegram)
      ) {
        required.push(CHANNEL_NAMES.Telegram)
      }

      if (
        !isEmailConnected &&
        channels.some(type => type === CHANNEL_NAMES.Email)
      ) {
        required.push(CHANNEL_NAMES.Email)
      }

      if (
        !isWebPushEnabled &&
        channels.some(type => type === CHANNEL_NAMES.Browser)
      ) {
        required.push(CHANNEL_NAMES.Browser)
      }

      setRequiredChannels(required)
    },
    [isTelegramConnected, isEmailConnected, isWebPushEnabled]
  )

  const onWebhookChange = useCallback(
    e => {
      const channel = findWebHook(channels)

      const val = e.target.value

      if (channel) {
        channel.webhook = val
        setFieldValue('channels', channels)
      } else {
        setFieldValue('channels', [
          ...channels,
          {
            webhook: val
          }
        ])
      }

      setWebhook(val)
    },
    [channels, setFieldValue]
  )

  const toggleChannel = useCallback(
    channel => {
      let newChannels = []
      switch (channel) {
        case CHANNEL_NAMES.Webhook: {
          const whChannel = findWebHook(channels)
          if (!whChannel) {
            newChannels = [
              ...channels,
              {
                webhook
              }
            ]
          } else {
            newChannels = channels.filter(item => !isWebhookChannel(item))
          }
          break
        }

        default: {
          if (channels.indexOf(channel) !== -1) {
            newChannels = channels.filter(item => item !== channel)
          } else {
            newChannels = [...channels, channel]
          }
        }
      }

      setFieldValue('channels', newChannels)
    },
    [channels, setFieldValue]
  )

  useEffect(
    () => {
      if (!channels.length) {
        return
      }

      if (!webhook) {
        const whChannel = findWebHook(channels)
        if (whChannel) {
          setWebhook(whChannel.webhook)
        }
      }

      const active = channels.filter(channel => !isDisabled(channel))

      if (!channels.some(channel => active.indexOf(channel) !== -1)) {
        setFieldValue('channels', active)
      }
    },
    [channels]
  )

  const isActive = useCallback(
    channel => {
      switch (channel) {
        case CHANNEL_NAMES.Webhook: {
          return findWebHook(channels)
        }
        default: {
          return channels.some(active => active === channel)
        }
      }
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

  return (
    <div className={cx(styles.row, styles.rowSingle)}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <div className={styles.notifyBlock}>
          {CHANNELS.map(channel => {
            if (channel === CHANNEL_NAMES.Browser && !isBeta) {
              return null
            }

            const isWebhook = channel === CHANNEL_NAMES.Webhook

            return (
              <div
                className={cx(styles.channel, isWebhook && styles.webhook)}
                key={channel}
              >
                <ChannelCheckbox
                  channel={channel}
                  isActive={isActive}
                  isDisabled={isDisabled}
                  toggleChannel={toggleChannel}
                  isRequired={isRequired(channel)}
                  recheckBrowserNotifications={recheckBrowserNotifications}
                  isConnectable={!isWebhook}
                />
                {isWebhook && (
                  <InputLink
                    name='webhook'
                    disabled={!findWebHook(channels)}
                    value={webhook}
                    onChange={onWebhookChange}
                    className={styles.inputLink}
                  />
                )}
              </div>
            )
          })}
        </div>
        {errors.channels && <ErrorMessage message={errors.channels} />}
      </div>
    </div>
  )
}

const ChannelCheckbox = ({
  channel,
  toggleChannel,
  isActive,
  isDisabled,
  isRequired,
  recheckBrowserNotifications,
  isConnectable = true
}) => {
  return (
    <div className={styles.checkbox}>
      <FormikCheckbox
        className={styles.checkboxBlock}
        name={'checkBox' + channel}
        disabled={isDisabled(channel)}
        isActive={isActive(channel)}
        label={channel}
        onClick={() => {
          toggleChannel(channel)
        }}
      />
      {isConnectable && (
        <TriggerChannelSettings
          showTrigger={isRequired}
          recheckBrowserNotifications={recheckBrowserNotifications}
          trigger={
            <div className={styles.requiredChannelExplanation}>Connect</div>
          }
        />
      )}
    </div>
  )
}

const ErrorMessage = ({ message, recheckBrowserNotifications, channel }) => (
  <div className={styles.messages}>
    <Message variant='warn' className={styles.messagesText}>
      {message || (
        <TriggerChannelSettings
          trigger={
            <div className={styles.openSettings}>
              Please, open your{' '}
              <Link to='#' className={styles.link}>
                account settings
              </Link>{' '}
              and enable{' '}
              <Link className={styles.link} to='#'>
                {channel}
              </Link>{' '}
              notifications
            </div>
          }
          recheckBrowserNotifications={recheckBrowserNotifications}
        />
      )}
    </Message>
  </div>
)

const mapStateToProps = ({
  user: {
    data: { email = '' }
  },
  rootUi: { isBetaModeEnabled }
}) => ({
  email,
  isBeta: isBetaModeEnabled
})

const enhance = connect(mapStateToProps)

export default enhance(TriggerFormChannels)

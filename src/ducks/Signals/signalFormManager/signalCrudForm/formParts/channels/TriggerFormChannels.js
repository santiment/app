import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Message from '@santiment-network/ui/Message'
import TriggerChannelSettings from './TriggerChannelSettings'
import FormikCheckbox from '../../../../../../components/formik-santiment-ui/FormikCheckbox'
import { CHANNEL_NAMES } from '../../../../utils/constants'
import InputLink from '../../../../../../components/InputLink/InputLink'
import {
  findWebHook,
  isWebhookChannel,
  useChannelTypes,
  useDisabledChannels
} from './hooks'
import styles from '../../signal/TriggerForm.module.scss'
import { useIsBetaMode } from '../../../../../../stores/ui'

const CHANNELS = [
  CHANNEL_NAMES.Email,
  CHANNEL_NAMES.Telegram,
  CHANNEL_NAMES.Browser,
  CHANNEL_NAMES.Webhook
]

const TriggerFormChannels = ({
  channels,
  errors,
  isTelegramConnected,
  isEmailConnected,
  setFieldValue,
  isNew
}) => {
  const [webhook, setWebhook] = useState('')

  const isBeta = useIsBetaMode()

  const [requiredChannels, setRequiredChannels] = useState([])

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
  })
  const { isActive, isDisabled, isRequired } = useChannelTypes({
    channels,
    disabledChannels,
    requiredChannels
  })

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

  useEffect(
    () => {
      toggleChannel(CHANNEL_NAMES.Telegram)
    },
    [isTelegramConnected]
  )

  useEffect(
    () => {
      toggleChannel(CHANNEL_NAMES.Email)
    },
    [isEmailConnected]
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
    <Message variant='warn'>
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

export default TriggerFormChannels

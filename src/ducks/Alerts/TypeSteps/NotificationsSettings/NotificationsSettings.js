import React, { useCallback, useEffect, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Select from '@santiment-network/ui/Search/Select/Select'
import Message from '@santiment-network/ui/Message'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import { Link } from 'react-router-dom'

import NotificationsIcon from '../../../../components/Illustrations/NotificationsIcon'
import InputLink from '../../../../components/InputLink/InputLink'
import TriggerChannelSettings from '../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'

import {
  CHANNEL_NAMES,
  FREQUENCY_TYPES_OPTIONS
} from '../../../Signals/utils/constants'
import {
  getFrequencyTimeType,
  getFrequencyTimeValues,
  getNearestFrequencyTimeValue,
  getNearestFrequencyTypeValue
} from '../../../Signals/utils/utils'
import {
  refetchUserSettings,
  useUserSettings
} from '../../../../stores/user/settings'
import { useIsBetaMode } from '../../../../stores/ui'
import {
  findWebHook,
  isWebhookChannel,
  useChannelTypes,
  useDisabledChannels
} from '../../../Signals/signalFormManager/signalCrudForm/formParts/channels/hooks'

import styles from './NotificationsSettings.module.scss'

const CHANNELS = [
  CHANNEL_NAMES.Email,
  CHANNEL_NAMES.Telegram,
  CHANNEL_NAMES.Browser,
  CHANNEL_NAMES.Webhook
]

const REFETCH_TELEGRAM_TIMEOUT = 2000

const checkAndAdd = (required, channels, flag, chType) => {
  if (!flag && channels.some(type => type === chType)) {
    required.push(chType)
  }

  return required
}

const checkIn = (channels, flag, chType) => {
  if (!flag) {
    return channels.filter(item => item !== chType)
  }

  return channels
}

const NotificationsSettings = ({
  handleStepClick,
  values,
  values: { channels },
  handleFormValueChange,
  metaFormSettings,
  handleTitlesChange
}) => {
  const {
    settings: {
      alertNotifyTelegram: isTelegramConnected,
      alertNotifyEmail: isEmailConnected,
      isEmailAllowAlerts: userEmail,
      hasTelegramConnected
    }
  } = useUserSettings()

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

  useEffect(() => {
    let newChannels = channels
    newChannels = checkIn(
      newChannels,
      isTelegramConnected,
      CHANNEL_NAMES.Telegram
    )
    newChannels = checkIn(newChannels, isEmailConnected, CHANNEL_NAMES.Email)

    const active = newChannels.filter(channel => !isDisabled(channel))

    if (!channels.some(channel => active.indexOf(channel) !== -1)) {
      handleFormValueChange({
        field: 'channels',
        value: active
      })
      handleTitlesChange('channels', active)
    }
  }, [isTelegramConnected, isEmailConnected])

  useEffect(() => {
    calculateDisabledChannels()
    let required = []

    required = checkAndAdd(
      required,
      channels,
      isTelegramConnected,
      CHANNEL_NAMES.Telegram
    )
    required = checkAndAdd(
      required,
      channels,
      isEmailConnected,
      CHANNEL_NAMES.Email
    )
    required = checkAndAdd(
      required,
      channels,
      isWebPushEnabled,
      CHANNEL_NAMES.Browser
    )

    setRequiredChannels(required)
  }, [isTelegramConnected, isEmailConnected, isWebPushEnabled])

  const onWebhookChange = useCallback(
    e => {
      const channel = findWebHook(channels)

      const val = e.target.value

      if (channel) {
        channel.webhook = val
        handleFormValueChange({
          field: 'channels',
          value: channels
        })
        handleTitlesChange('channels', channels)
      } else {
        handleFormValueChange({
          field: 'channels',
          value: [
            ...channels,
            {
              webhook: val
            }
          ]
        })
        handleTitlesChange('channels', [
          ...channels,
          {
            webhook: val
          }
        ])
      }

      setWebhook(val)
    },
    [channels, handleFormValueChange]
  )

  const addOrRemove = useCallback(
    (channel, flag) => {
      const enabled = channels.indexOf(channel) !== -1

      if (enabled && flag === true) {
        return
      }

      if (!enabled && flag === false) {
        return
      }

      let newChannels

      if (enabled) {
        newChannels = channels.filter(item => item !== channel)
      } else {
        newChannels = [...channels, channel]
      }

      handleFormValueChange({
        field: 'channels',
        value: newChannels
      })
      handleTitlesChange('channels', newChannels)
    },
    [channels, handleFormValueChange]
  )

  const toggleChannel = useCallback(
    channel => {
      switch (channel) {
        case CHANNEL_NAMES.Webhook: {
          let newChannels = []
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
          handleFormValueChange({
            field: 'channels',
            value: newChannels
          })
          handleTitlesChange('channels', newChannels)
          break
        }

        default: {
          addOrRemove(channel)
        }
      }
    },
    [channels, handleFormValueChange, addOrRemove]
  )

  useEffect(() => {
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
      handleFormValueChange({
        field: 'channels',
        value: active
      })
      handleTitlesChange('channels', active)
    }
  }, [channels])

  useEffect(() => {
    addOrRemove(CHANNEL_NAMES.Telegram, isTelegramConnected)
  }, [isTelegramConnected])

  useEffect(() => {
    addOrRemove(CHANNEL_NAMES.Email, isEmailConnected)
  }, [isEmailConnected])

  useEffect(() => {
    let interval

    if (!hasTelegramConnected) {
      interval = setInterval(() => {
        if (!hasTelegramConnected) {
          refetchUserSettings()
        }
      }, REFETCH_TELEGRAM_TIMEOUT)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  const defaultFrequencyType = metaFormSettings.frequencyType

  const frequencyOptions = FREQUENCY_TYPES_OPTIONS.filter(item => {
    return (
      !item.disabledMetrics ||
      item.disabledMetrics.indexOf(values.metric) === -1
    )
  })

  const frequencyTimeTypeOptions = getFrequencyTimeType(values.frequencyType)

  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <NotificationsIcon className={styles.icon} />
          Notification & Privacy settings
        </div>
      </div>
      <div className={styles.cardWrapper}>
        <div className={styles.cardTitle}>Alert action</div>
        <div className={styles.cardField}>
          <Checkbox
            disabled={isDisabled(CHANNELS[0])}
            isActive={isActive(CHANNELS[0])}
            onClick={() => toggleChannel(CHANNELS[0])}
          />
          <div className={styles.cardFieldInfo}>
            <div className={styles.cardFieldTitle}>
              Email
              <TriggerChannelSettings
                showTrigger={isRequired(CHANNELS[0])}
                recheckBrowserNotifications={recheckBrowserNotifications}
                trigger={
                  <div className={styles.enableTitle}>
                    Enable {CHANNELS[0]} alerts
                  </div>
                }
              />
            </div>
            <div className={styles.cardFieldSubtitle}>{userEmail}</div>
          </div>
        </div>
        <div className={styles.cardField}>
          <Checkbox
            disabled={isDisabled(CHANNELS[1])}
            isActive={isActive(CHANNELS[1])}
            onClick={() => toggleChannel(CHANNELS[1])}
          />
          <div className={styles.cardFieldInfo}>
            <div className={styles.cardFieldTitle}>
              Telegram
              <TriggerChannelSettings
                showTrigger={isRequired(CHANNELS[1])}
                recheckBrowserNotifications={recheckBrowserNotifications}
                trigger={
                  <div className={styles.enableTitle}>
                    Enable {CHANNELS[1]} alerts
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.cardField}>
          <Checkbox
            disabled={isDisabled(CHANNELS[3])}
            isActive={isActive(CHANNELS[3])}
            onClick={() => toggleChannel(CHANNELS[3])}
          />
          <div className={styles.cardFieldInfo}>
            <div className={styles.cardFieldTitle}>Webhook URL</div>
            <InputLink
              disabled={!findWebHook(channels)}
              value={webhook}
              onChange={onWebhookChange}
              className={styles.inputLink}
            />
          </div>
        </div>
      </div>
      <div className={styles.cardWrapper}>
        <div className={styles.cardTitle}>Frequency of notifications</div>
        <div className={styles.inputRow}>
          <Select
            disabled={defaultFrequencyType.isDisabled}
            maxHeight={330}
            clearable={false}
            isSearchable
            defaultValue={defaultFrequencyType.value.value}
            placeholder='Choose a frequency'
            classNamePrefix='react-select'
            minimumInput={1}
            onChange={value => {
              handleFormValueChange({
                field: 'frequencyType',
                value
              })
              const newFrequencyTimeType = getNearestFrequencyTypeValue(value)
              handleFormValueChange({
                field: 'frequencyTimeType',
                value: newFrequencyTimeType
              })
              handleFormValueChange({
                field: 'frequencyTimeValue',
                value: getNearestFrequencyTimeValue(newFrequencyTimeType)
              })
            }}
            options={frequencyOptions}
            value={values.frequencyType}
          />
          <Select
            disabled={!values.frequencyType || !values.frequencyTimeType}
            isSearchable
            options={getFrequencyTimeValues(values.frequencyTimeType)}
            maxHeight={330}
            clearable={false}
            classNamePrefix='react-select'
            minimumInput={1}
            onChange={value => {
              handleFormValueChange({
                field: 'frequencyTimeValue',
                value
              })
            }}
            value={values.frequencyTimeValue}
          />
          <Select
            disabled={
              !values.frequencyType || frequencyTimeTypeOptions.length === 1
            }
            isClearable={false}
            options={frequencyTimeTypeOptions}
            maxHeight={330}
            clearable={false}
            classNamePrefix='react-select'
            minimumInput={1}
            onChange={value => {
              handleFormValueChange({
                field: 'frequencyTimeType',
                value
              })
            }}
            value={values.frequencyTimeType}
          />
        </div>
      </div>
      <div className={styles.bottomActions}>
        <Button
          onClick={handleStepClick(3)}
          className={styles.submit}
          accent='positive'
        >
          Name & Description
          <Icon className={styles.submitIcon} type='pointer-right' />
        </Button>
      </div>
    </>
  )
}

export default NotificationsSettings

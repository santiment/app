import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import Message from '@santiment-network/ui/Message'
import FormikLabel from '../../../../../../components/formik-santiment-ui/FormikLabel'
import TriggerChannelSettings from './TriggerChannelSettings'
import { getSanSonarSW } from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import FormikCheckbox from '../../../../../../components/formik-santiment-ui/FormikCheckbox'
import styles from '../../signal/TriggerForm.module.scss'
import SidecarExplanationTooltip from '../../../../../SANCharts/SidecarExplanationTooltip'

const CHANNEL_NAMES = {
  Telegram: 'Telegram',
  Email: 'Email',
  Browser: 'Browser'
}

const permanentDisabledChannels = [CHANNEL_NAMES.Email]

const TriggerFormChannels = ({
  channels,
  errors,
  isTelegramConnected,
  isEmailConnected,
  isBeta,
  setFieldValue
}) => {
  const [isWebPushEnabled, setWebPushEnabled] = useState(true)
  const [disabledChannels, setDisabledChannels] = useState([
    CHANNEL_NAMES.Email
  ])

  const [requiredChannels, setRequiredChannels] = useState([])

  const calculateDisabledChannels = () => {
    const disabled = [...permanentDisabledChannels]

    if (!isTelegramConnected) {
      disabled.push(CHANNEL_NAMES.Telegram)
    }
    if (!isWebPushEnabled) {
      disabled.push(CHANNEL_NAMES.Browser)
    }

    setDisabledChannels(disabled)
  }

  const recheckBrowserNotifications = () => {
    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker.getRegistrations().then(registrations => {
        const sw = getSanSonarSW(registrations)
        const hasServiceWorker = !!sw

        setWebPushEnabled(hasServiceWorker)
        calculateDisabledChannels()
      })
  }

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
    },
    [isTelegramConnected, isEmailConnected, isWebPushEnabled]
  )

  useEffect(
    () => {
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

  const toggleChannel = channel => {
    if (channels.indexOf(channel) !== -1) {
      setFieldValue('channels', channels.filter(item => item !== channel))
    } else {
      setFieldValue('channels', [...channels, channel])
    }
  }

  const isDisabled = channel => {
    return disabledChannels.some(disabled => disabled === channel)
  }

  const isActive = channel => {
    return channels.some(active => active === channel)
  }

  const isRequired = channel => {
    return (
      requiredChannels.some(required => required === channel) ||
      disabledChannels.some(
        disabled =>
          disabled === channel &&
          permanentDisabledChannels.indexOf(disabled) === -1
      )
    )
  }

  return (
    <div className={cx(styles.row, styles.rowSingle)}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <SidecarExplanationTooltip
          closeTimeout={500}
          localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
          position='top'
          title='Connect channels'
          description='Get fast notifications through Email, Telegram or Browser'
          className={styles.explanation}
        >
          <FormikLabel text='Notify me via' />
        </SidecarExplanationTooltip>
        <div className={styles.notifyBlock}>
          <ChannelCheckbox
            channel={CHANNEL_NAMES.Email}
            isActive={isActive}
            isDisabled={isDisabled}
            toggleChannel={toggleChannel}
            isRequired={isRequired}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />

          <ChannelCheckbox
            channel={CHANNEL_NAMES.Telegram}
            isActive={isActive}
            isDisabled={isDisabled}
            toggleChannel={toggleChannel}
            isRequired={isRequired}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />

          <ChannelCheckbox
            channel={CHANNEL_NAMES.Browser}
            isActive={isActive}
            isDisabled={isDisabled}
            toggleChannel={toggleChannel}
            isRequired={isRequired}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />
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
  recheckBrowserNotifications
}) => {
  return (
    <div className={styles.checkboxBlock}>
      <FormikCheckbox
        name={'checkBox' + channel}
        disabled={isDisabled(channel)}
        isActive={isActive(channel)}
        label={channel}
        onClick={() => {
          toggleChannel(channel)
        }}
      />
      <TriggerChannelSettings
        showTrigger={isRequired(channel)}
        recheckBrowserNotifications={recheckBrowserNotifications}
        trigger={
          <div className={styles.requiredChannelExplanation}>Connect</div>
        }
      />
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

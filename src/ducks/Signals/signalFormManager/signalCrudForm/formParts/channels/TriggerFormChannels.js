import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import Message from '@santiment-network/ui/Message'
import SidecarExplanationTooltip from '../../../../../SANCharts/SidecarExplanationTooltip'
import FormikLabel from '../../../../../../components/formik-santiment-ui/FormikLabel'
import FormikCheckboxes from '../../../../../../components/formik-santiment-ui/FormikCheckboxes'
import TriggerChannelSettings from './TriggerChannelSettings'
import { CHANNELS_MAP } from '../../../../utils/constants'
import { getSanSonarSW } from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import styles from '../../signal/TriggerForm.module.scss'

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
  isBeta
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

  const [channelsList] = useState(CHANNELS_MAP.map(({ label }) => label))

  const hasNotEnabledChannels = disabledChannels.some(disabled => {
    return permanentDisabledChannels.indexOf(disabled) === -1
  })

  return (
    <div className={cx(styles.row, styles.rowSingle)}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <FormikLabel text='Notify me via' />
        <div className={styles.notifyBlock}>
          <FormikCheckboxes
            name='channels'
            labelOnRight
            options={channelsList}
            disabledIndexes={disabledChannels}
            classes={styles}
          />
          <TriggerChannelSettings
            showTrigger={hasNotEnabledChannels}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />
        </div>
        {requiredChannels.length > 0 && (
          <ErrorMessage
            channel={requiredChannels.join(', ')}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />
        )}
        {errors.channels && (
          <SidecarExplanationTooltip
            closeTimeout={500}
            localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
            position='top'
            title='Connect channels'
            description='Get fast notifications through Email or Telegram or Browser'
            className={styles.explanation}
          >
            <ErrorMessage message={errors.channels} />
          </SidecarExplanationTooltip>
        )}
      </div>
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

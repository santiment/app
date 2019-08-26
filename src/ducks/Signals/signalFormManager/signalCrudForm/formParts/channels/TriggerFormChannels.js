import React, { useState, useEffect } from 'react'
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

const TriggerFormChannels = ({
  channels,
  errors,
  isTelegramConnected,
  isEmailConnected,
  isBeta
}) => {
  const settingsForTelegramEnabled =
    !isTelegramConnected && channels.some(type => type === 'Telegram')
  const settingsForEmailEnabled =
    !isEmailConnected && channels.some(type => type === 'Email')

  const [isWebPushEnabled, setWebPushEnabled] = useState(true)

  const recheckBrowserNotifications = () => {
    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker.getRegistrations().then(registrations => {
        const sw = getSanSonarSW(registrations)
        setWebPushEnabled(!sw && channels.some(type => type === 'Web Push'))
      })
  }

  useEffect(() => {
    if (isBeta) {
      recheckBrowserNotifications()
    }
  })

  const [channelsList] = useState(CHANNELS_MAP.map(({ label }) => label))

  return (
    <div className={cx(styles.row, styles.rowSingle)}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <FormikLabel text='Notify me via' />
        <div className={styles.notifyBlock}>
          <FormikCheckboxes
            name='channels'
            labelOnRight
            options={channelsList}
            disabledIndexes={['Email']}
            classes={styles}
          />
          <TriggerChannelSettings
            isTelegramSettings={settingsForTelegramEnabled}
            isEmailSettings={settingsForEmailEnabled}
            isWebPushSettings={isWebPushEnabled}
            recheckBrowserNotifications={recheckBrowserNotifications}
          />
        </div>
        {settingsForTelegramEnabled && <ErrorMessage channel='Telegram' />}
        {settingsForEmailEnabled && <ErrorMessage channel='Email' />}
        {isWebPushEnabled && <ErrorMessage channel='Browser' />}
        {errors.channels && (
          <SidecarExplanationTooltip
            closeTimeout={500}
            localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
            position='top'
            title='Connect channels'
            description='Get fast notifications through Email or Telegram'
            className={styles.explanation}
          >
            <ErrorMessage message={errors.channels} />
          </SidecarExplanationTooltip>
        )}
      </div>
    </div>
  )
}

const ErrorMessage = ({ message, channel }) => (
  <div className={styles.messages}>
    <Message variant='warn' className={styles.messagesText}>
      {message ||
        `Please, open your account settings and enable ${channel} notifications`}
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

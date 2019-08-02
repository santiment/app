import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import styles from '../../signal/TriggerForm.module.scss'
import { Link } from 'react-router-dom'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import * as actions from '../../../../../../actions/types'
import { connect } from 'react-redux'
import React from 'react'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'

const TriggerChannelSettings = ({
  channels,
  isTelegramConnected,
  isEmailConnected,
  isEmailNotificationEnabled,
  isTelegramNotificationEnabled,
  toggleEmailNotification,
  toggleTelegramNotification
}) => {
  const notConnectedTelegram =
    channels.find(c => c === 'Telegram') && !isTelegramConnected
  const notConnectedEmail =
    channels.find(c => c === 'Email') && !isEmailConnected

  return (
    <>
      <Dialog
        trigger={
          <Button
            className={styles.connectLink}
            variant='ghost'
            as={Link}
            to='/account'
          >
            <span className={styles.connectLink}>Connect</span>
          </Button>
        }
        title='Notification channels'
      >
        <Dialog.ScrollContent>
          <EmailSetting />
          <ConnectTelegramBlock classes={styles} />

          <SettingsTelegramNotifications />

          <div>
            <Label>Telegram notifications</Label>

            <div>
              <Toggle
                isActive={isTelegramNotificationEnabled}
                onClick={() =>
                  toggleTelegramNotification(!isTelegramNotificationEnabled)
                }
              />
            </div>
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({
  user: {
    data: { settings: { signalNotifyEmail, signalNotifyTelegram } = {} }
  }
}) => ({
  isEmailNotificationEnabled: signalNotifyEmail,
  isTelegramNotificationEnabled: signalNotifyTelegram
})

const mapDispatchToProps = dispatch => ({
  toggleEmailNotification: signalNotifyEmail =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyEmail }
    }),
  toggleTelegramNotification: signalNotifyTelegram =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyTelegram }
    })
})

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default enhance(TriggerChannelSettings)

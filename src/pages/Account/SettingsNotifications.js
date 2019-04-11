import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsNotifications = ({
  isEmailNotificationEnabled,
  isTelegramNotificationEnabled,
  toggleEmailNotification,
  toggleTelegramNotification
}) => {
  return (
    <Settings id='notifications' header='Notifications'>
      <Settings.Row>
        <Label>Email notifications</Label>
        <div className={styles.setting__right_notifications}>
          <Label className={styles.signalInfo} accent='jungle-green'>
            Manage followed signals (15/25)
          </Label>
          <Toggle
            isActive={isEmailNotificationEnabled}
            onClick={() => toggleEmailNotification(!isEmailNotificationEnabled)}
          />
        </div>
      </Settings.Row>

      <Settings.Row>
        <Label>Telegram notifications</Label>

        <div className={styles.setting__right_notifications}>
          <Label className={styles.signalInfo} accent='jungle-green'>
            Manage followed signals (25/25)
          </Label>
          <Toggle
            isActive={isTelegramNotificationEnabled}
            onClick={() =>
              toggleTelegramNotification(!isTelegramNotificationEnabled)
            }
          />
        </div>
      </Settings.Row>

      <Settings.Row>
        <div className={styles.setting__left}>
          <Label>Digest</Label>
          <Label className={styles.setting__description} accent='waterloo'>
            Receive the best insights and signals on Sanbase
            <br />
            peersonalized based on your interests.
          </Label>
        </div>
        <Selector
          options={['Daily', 'Weekly', 'Off']}
          // onSelectOption={Selected}
          defaultSelected='Off'
        />
      </Settings.Row>
    </Settings>
  )
}

const mapStateToProps = ({
  user: {
    data: {
      email,
      settings: { signalNotifyEmail, signalNotifyTelegram }
    }
  }
}) => ({
  hasEmail: !!email,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsNotifications)

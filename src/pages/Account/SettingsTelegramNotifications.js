import React from 'react'
import { connect } from 'react-redux'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsTelegramNotifications = ({
  isTelegramNotificationEnabled,
  toggleTelegramNotification
}) => {
  return (
    <>
      <Label>Telegram notifications</Label>

      <div className={styles.setting__right_notifications}>
        <Toggle
          isActive={isTelegramNotificationEnabled}
          onClick={() =>
            toggleTelegramNotification(!isTelegramNotificationEnabled)
          }
        />
      </div>
    </>
  )
}

const mapStateToProps = ({
  user: {
    data: { settings: { signalNotifyTelegram } = {} }
  }
}) => ({
  isTelegramNotificationEnabled: signalNotifyTelegram
})

const mapDispatchToProps = dispatch => ({
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

export default enhance(SettingsTelegramNotifications)

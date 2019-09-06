import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsTelegramNotifications = ({
  isTelegramNotificationEnabled,
  toggleTelegramNotification,
  classes = {},
  description
}) => {
  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Telegram notifications</Label>

      <div className={cx(styles.setting__right_notifications, classes.right)}>
        {description}
        <Toggle
          isActive={isTelegramNotificationEnabled}
          onClick={() =>
            toggleTelegramNotification(!isTelegramNotificationEnabled)
          }
        />
      </div>
    </div>
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

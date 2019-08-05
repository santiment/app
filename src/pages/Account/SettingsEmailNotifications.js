import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsEmailNotifications = ({
  isEmailNotificationEnabled,
  toggleEmailNotification,
  classes = {}
}) => {
  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Email notifications</Label>
      <div className={cx(styles.setting__right_notifications, classes.right)}>
        <Toggle
          isActive={isEmailNotificationEnabled}
          onClick={() => toggleEmailNotification(!isEmailNotificationEnabled)}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({
  user: {
    data: { settings: { signalNotifyEmail } = {} }
  }
}) => ({
  isEmailNotificationEnabled: signalNotifyEmail
})

const mapDispatchToProps = dispatch => ({
  toggleEmailNotification: signalNotifyEmail =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyEmail }
    })
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(SettingsEmailNotifications)

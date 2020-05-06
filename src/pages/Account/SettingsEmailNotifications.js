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
  classes = {},
  description,
  email
}) => {
  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Email notifications</Label>
      <div className={cx(styles.setting__right_notifications, classes.right)}>
        {description}
        {email ? (
          <Toggle
            isActive={isEmailNotificationEnabled}
            onClick={() => toggleEmailNotification(!isEmailNotificationEnabled)}
          />
        ) : (
          'Please add email to enable notifications'
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({
  user: {
    data: { email, settings: { signalNotifyEmail } = {} }
  }
}) => ({
  isEmailNotificationEnabled: signalNotifyEmail,
  email
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

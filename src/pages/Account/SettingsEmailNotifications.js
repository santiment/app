import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsEmailNotifications = ({
  isEmailNotificationEnabled,
  toggleEmailNotification
}) => {
  return (
    <>
      <Label>Email notifications</Label>
      <div className={styles.setting__right_notifications}>
        <Toggle
          isActive={isEmailNotificationEnabled}
          onClick={() => toggleEmailNotification(!isEmailNotificationEnabled)}
        />
      </div>
    </>
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

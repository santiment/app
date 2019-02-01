import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Toggle, Input } from '@santiment-network/ui'
import * as actions from './actions'

const AccountNotificationChannels = ({
  hasTelegramConnected,
  hasEmail,
  generateTelegramDeepLink,
  revokeTelegramDeepLink,
  toggleEmailNotification,
  signalNotifyTelegram,
  signalNotifyEmail,
  telegramDeepLink
}) => (
  <Fragment>
    <h3>Notification Channels</h3>
    <ul>
      <li>
        Telegram {hasTelegramConnected ? 'Connected' : 'Not connected'}
        <br />
        {telegramDeepLink && <Input defaultValue={telegramDeepLink} readOnly />}
        <Button onClick={generateTelegramDeepLink}>Activate</Button>
        <Button onClick={revokeTelegramDeepLink}>Revoke</Button>
        {signalNotifyTelegram && 'Activated'}
      </li>
      <li>
        Email
        {!hasEmail && 'You need to connect any email address'}
        <Toggle
          onClick={() => toggleEmailNotification(!signalNotifyEmail)}
          isActive={signalNotifyEmail}
        />
      </li>
    </ul>
  </Fragment>
)

const mapStateToProps = state => ({
  ...state.user.data.settings,
  // signalNotifyEmail: state.user.data.settings.signalNotifyEmail,
  // signalNotifyTelegram: state.user.data.settings.signalNotifyTelegram,
  // hasTelegramConnected: state.user.data.settings.hasTelegramConnected,
  telegramDeepLink: state.settings.telegramDeepLink,
  hasEmail: !!state.user.data.email
})

const mapDispatchToProps = dispatch => ({
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK }),
  revokeTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_REVOKE_TELEGRAM_DEEP_LINK }),
  toggleEmailNotification: signalNotifyEmail =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: {
        signalNotifyEmail
      }
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNotificationChannels)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withProps, compose } from 'recompose'
import { Button, Checkbox, Input } from '@santiment-network/ui'
import * as actions from './actions'

const AccountNotificationChannels = ({
  hasTelegramConnected,
  hasEmail,
  generateTelegramDeepLink,
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
      </li>
      <li>Email {hasEmail ? 'Ok' : 'You need to connect any email address'}</li>
    </ul>
  </Fragment>
)

const mapStateToProps = state => ({
  settings: state.user.settings,
  telegramDeepLink: state.settings.telegramDeepLink,
  hasEmail: !!state.user.data.email
})

const mapDispatchToProps = dispatch => ({
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK })
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ settings = { hasTelegramConnected: false }, ...rest }) => {
    return {
      hasTelegramConnected: settings.hasTelegramConnected,
      ...rest
    }
  })
)(AccountNotificationChannels)

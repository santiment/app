import React from 'react'
import { connect } from 'react-redux'
import { Toggle, Label } from '@santiment-network/ui'
import Settings from './Settings'
import UsernameSetting from './UsernameSetting'
import EmailSetting from './EmailSetting'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsGeneral = ({
  email,
  username,
  dispatchNewUsername,
  dispatchNewEmail,
  toggleNightMode,
  toggleBetaMode,
  isNightModeEnabled,
  isBetaModeEnabled
}) => (
  <Settings id='general' header='General'>
    <UsernameSetting
      dispatchNewUsername={dispatchNewUsername}
      username={username}
    />
    <EmailSetting dispatchNewEmail={dispatchNewEmail} email={email} />
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Night mode</Label>
      </div>
      <Toggle isActive={isNightModeEnabled} onClick={toggleNightMode} />
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Beta mode</Label>
      </div>
      <Toggle isActive={isBetaModeEnabled} onClick={toggleBetaMode} />
    </Settings.Row>
  </Settings>
)

const mapStateToProps = ({
  user: { data: { email, username } = {} },
  rootUi: { isNightModeEnabled, isBetaModeEnabled }
}) => ({
  email,
  username,
  isNightModeEnabled,
  isBetaModeEnabled
})

const mapDispatchToProps = dispatch => ({
  dispatchNewEmail: email =>
    dispatch({
      type: actions.USER_EMAIL_CHANGE,
      email
    }),
  dispatchNewUsername: username =>
    dispatch({
      type: actions.USER_USERNAME_CHANGE,
      username
    }),
  toggleNightMode: () =>
    dispatch({
      type: actions.USER_TOGGLE_NIGHT_MODE
    }),
  toggleBetaMode: () =>
    dispatch({
      type: actions.USER_TOGGLE_BETA_MODE
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsGeneral)

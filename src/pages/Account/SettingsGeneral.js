import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  Input,
  Tabs,
  Toggle,
  Label,
  Button,
  Selector
} from '@santiment-network/ui'
import Settings from './Settings'
import EditableInputSetting from './EditableInputSetting'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const validateUsername = username => {
  if (!username || username.length < 3) {
    return 'Username should be at least 3 characters long'
  }
}

const validateEmail = email => {
  if (!email) {
    return 'Email is required'
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Invalid email address'
  }
}

const SettingsGeneral = ({
  email,
  username,
  toggleNightMode,
  toggleBetaMode,
  isNightModeEnabled,
  isBetaModeEnabled
}) => (
  <Settings id='general' header='General'>
    <EditableInputSetting
      label='Username'
      defaultValue={username}
      validate={validateUsername}
      onSubmit={console.log}
    />

    <EditableInputSetting
      label='Email'
      defaultValue={email}
      validate={validateEmail}
      onSubmit={console.log}
    />
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
  user: {
    data: { email, username }
  },
  rootUi: { isNightModeEnabled, isBetaModeEnabled }
}) => ({
  email,
  username,
  isNightModeEnabled,
  isBetaModeEnabled
})

const mapDispatchToProps = dispatch => ({
  changeEmail: email =>
    dispatch({
      type: actions.USER_EMAIL_CHANGE,
      email
    }),
  changeUsername: username =>
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

import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsGeneral = ({
  toggleNightMode,
  toggleBetaMode,
  isNightModeEnabled,
  isBetaModeEnabled
}) => (
  <Settings id='general' header='General'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Nickname</Label>
      </div>
      <Label accent='jungle-green'>Add your nickname</Label>
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Email</Label>
      </div>
      <Label accent='jungle-green'>Add your email</Label>
    </Settings.Row>
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
  user,
  rootUi: { isNightModeEnabled, isBetaModeEnabled }
}) => ({
  user: user.data,
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

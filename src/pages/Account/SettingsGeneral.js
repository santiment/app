import React from 'react'
import { connect } from 'react-redux'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import Settings from './Settings'
import UsernameSetting from './userName/UsernameSetting'
import NameSetting from './name/NameSetting'
import AvatarSettings from './avatar/AvatarSettings'
import AlertMessage from '../../components/Alert/AlertMessage'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsGeneral = ({
  email,
  username,
  name,
  avatarUrl,
  dispatchNewUsername,
  dispatchNewName,
  toggleNightMode,
  toggleBetaMode,
  isNightModeEnabled,
  isBetaModeEnabled
}) => (
  <>
    {!email && (
      <AlertMessage
        text='Please connect your email to access all features of Sanbase.'
        warning
      />
    )}
    <Settings id='general' header='General'>
      <Settings.Row>
        <AvatarSettings avatarUrl={avatarUrl} />
      </Settings.Row>
      <NameSetting dispatchNewName={dispatchNewName} name={name} />
      <UsernameSetting
        dispatchNewUsername={dispatchNewUsername}
        username={username}
        name={name}
      />
      <Settings.Row>
        <div className={styles.setting__left}>
          <Label className={styles.label}>Night mode</Label>
        </div>
        <Toggle isActive={isNightModeEnabled} onClick={toggleNightMode} />
      </Settings.Row>
      <Settings.Row>
        <div className={styles.setting__left}>
          <Label className={styles.label}>Beta mode</Label>
        </div>
        <Toggle isActive={isBetaModeEnabled} onClick={toggleBetaMode} />
      </Settings.Row>
    </Settings>
  </>
)

const mapStateToProps = ({
  rootUi: { isNightModeEnabled, isBetaModeEnabled }
}) => ({
  isNightModeEnabled,
  isBetaModeEnabled
})

const mapDispatchToProps = dispatch => ({
  dispatchNewUsername: username =>
    dispatch({
      type: actions.USER_USERNAME_CHANGE,
      username
    }),
  dispatchNewName: name =>
    dispatch({
      type: actions.USER_NAME_CHANGE,
      name
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsGeneral)

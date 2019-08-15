import React from 'react'
import { connect } from 'react-redux'
import { Toggle, Label } from '@santiment-network/ui'
import Settings from './Settings'
import UsernameSetting from './UsernameSetting'
import EmailSetting from './EmailSetting'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsGeneral = ({
  username,
  dispatchNewUsername,
  toggleNightMode,
  toggleBetaMode,
  toggleNews,
  isNightModeEnabled,
  isBetaModeEnabled,
  isNewsEnabled
}) => (
  <Settings id='general' header='General'>
    <UsernameSetting
      dispatchNewUsername={dispatchNewUsername}
      username={username}
    />
    <EmailSetting />
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
    {isBetaModeEnabled && (
      <Settings.Row>
        <div className={styles.setting__left}>
          <Label>News</Label>
        </div>
        <Toggle isActive={isNewsEnabled} onClick={toggleNews} />
      </Settings.Row>
    )}
  </Settings>
)

const mapStateToProps = ({
  user: { data: { username } = {} },
  rootUi: { isNightModeEnabled, isBetaModeEnabled, isNewsEnabled }
}) => ({
  username,
  isNightModeEnabled,
  isBetaModeEnabled,
  isNewsEnabled
})

const mapDispatchToProps = dispatch => ({
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
    }),
  toggleNews: () =>
    dispatch({
      type: actions.USER_TOGGLE_NEWS
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsGeneral)

import React from 'react'
import { connect } from 'react-redux'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import Settings from './Settings'
import UsernameSetting from './userName/UsernameSetting'
import AlertMessage from '../../components/Alert/AlertMessage'
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
  isNewsEnabled,
  email
}) => (
  <>
    {!email && (
      <AlertMessage
        text='Please connect your email to access all features of Sanbase.'
        warning
      />
    )}
    <Settings id='general' header='General'>
      <UsernameSetting
        dispatchNewUsername={dispatchNewUsername}
        username={username}
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
      {isBetaModeEnabled && (
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>News</Label>
          </div>
          <Toggle isActive={isNewsEnabled} onClick={toggleNews} />
        </Settings.Row>
      )}
    </Settings>
  </>
)

const mapStateToProps = ({
  user: { data: { username, email } = {} },
  rootUi: { isNightModeEnabled, isBetaModeEnabled, isNewsEnabled }
}) => ({
  username,
  email,
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

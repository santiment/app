import React from 'react'
import { store } from '../../../redux'
import { showNotification } from '../../../actions/rootActions'
import EditableInputSetting from './../EditableInputSetting'
import { useUsernameChange } from '../../../hooks/profileChange'
import styles from './UsernameSettings.module.scss'

const UsernameSetting = ({ dispatchNewUsername, username, name }) => {
  const {
    changeUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    checkUsername,
    catchUsernameChangeError
  } = useUsernameChange()
  const normalizedUsername =
    username || (name && name.toLowerCase().replace(/ /g, '_'))

  return (
    <EditableInputSetting
      label='Username'
      defaultValue={normalizedUsername}
      validate={checkUsername}
      clearError={() => setUsernameError()}
      classes={styles}
      prefix='@'
      tooltip='Service assignation for any interactions on Sanbase'
      saving={savingUsername}
      submitError={usernameError}
      onSubmit={(value, successCallback) => {
        if (savingUsername) return
        changeUsername(value)
          .then(() => {
            store.dispatch(
              showNotification(`Username successfully changed to "${value}"`)
            )
            dispatchNewUsername(value)
            if (successCallback) successCallback()
          })
          .catch(catchUsernameChangeError)
      }}
    />
  )
}

export default UsernameSetting

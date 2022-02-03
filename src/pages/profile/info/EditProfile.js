import React from 'react'
import { connect } from 'react-redux'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import DarkTooltip from '../../../components/Tooltip/DarkTooltip'
import {
  useUsernameChange,
  useFullnameChange
} from '../../../hooks/profileChange'
import { useUser } from '../../../stores/user'
import * as actions from '../../../actions/types'
import styles from './ProfileInfo.module.scss'

const EditProfile = ({ onClose, dispatchNewUsername, dispatchNewName }) => {
  const { user } = useUser()

  const {
    username,
    setUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    checkUsername,
    changeUsername,
    catchUsernameChangeError
  } = useUsernameChange(user.username)

  const {
    fullname,
    setFullname,
    setFullnameError,
    fullnameError,
    checkFullname,
    savingFullname,
    catchFullnameChangeError,
    showFullnameChangedNotifiction,
    changeFullname
  } = useFullnameChange(user.name)

  async function saveButtonHandler () {
    if (
      savingFullname ||
      savingUsername ||
      checkUsername(username) ||
      checkFullname(fullname)
    )
      return
    if (user.username === username && user.name === fullname) {
      onClose()
      return
    }

    let hasError = false

    try {
      await changeUsername(username)
      dispatchNewUsername(username)
    } catch (e) {
      hasError = true
      catchUsernameChangeError(e)
    }

    try {
      await changeFullname(fullname)
      dispatchNewName(fullname)
    } catch (e) {
      hasError = true
      catchFullnameChangeError(e)
    }

    if (!hasError) {
      showFullnameChangedNotifiction('Changes successfully saved')
      onClose()
    }
  }

  return (
    <div className={styles.modalContent}>
      <label className={styles.label}>
        <DarkTooltip
          trigger={
            <div>
              Full name <Icon type='info-round' />
            </div>
          }
          position='top'
          align='start'
        >
          Official assignation for visitors to your user profile
        </DarkTooltip>
      </label>
      <Input
        name='name'
        autoComplete='off'
        placeholder='name'
        defaultValue={user.name}
        onChange={e => {
          setFullnameError()
          setFullname(e.target.value)
        }}
        onBlur={e => checkFullname(e.target.value)}
        isError={!!fullnameError}
        errorText={fullnameError}
        disabled={savingFullname}
      />
      <label className={styles.label}>
        <DarkTooltip
          trigger={
            <div>
              Username <Icon type='info-round' />
            </div>
          }
          position='top'
          align='start'
        >
          Service assignation for any interactions on Sanbase
        </DarkTooltip>
      </label>
      <div className={styles.inputPrefix}>
        <Input
          name='username'
          maxLength='25'
          autoComplete='off'
          placeholder='username'
          defaultValue={user.username}
          onChange={e => {
            setUsernameError()
            setUsername(e.target.value)
          }}
          onBlur={e => checkUsername(e.target.value)}
          isError={!!usernameError}
          errorText={usernameError}
          className={styles.usernameInput}
          disabled={savingUsername}
        />
      </div>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve
          isLoading={savingFullname || savingUsername}
          onClick={saveButtonHandler}
        >
          Save
        </Dialog.Approve>
        <Dialog.Cancel
          isLoading={savingFullname || savingUsername}
          onClick={onClose}
        >
          Cancel
        </Dialog.Cancel>
      </Dialog.Actions>
    </div>
  )
}

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
    })
})

export default connect(null, mapDispatchToProps)(EditProfile)

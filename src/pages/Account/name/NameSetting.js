import React from 'react'
import { useFullnameChange } from '../../../hooks/profileChange'
import EditableInputSetting from '../EditableInputSetting'
import styles from '../userName/UsernameSettings.module.scss'

const NameSetting = ({ dispatchNewName, name }) => {
  const {
    changeFullname,
    showFullnameChangedNotifiction,
    catchFullnameChangeError,
    checkFullname
  } = useFullnameChange()

  return (
    <EditableInputSetting
      label='Full name'
      defaultValue={name}
      validate={checkFullname}
      classes={styles}
      tooltip='Official assignation for visitors to your user profile'
      onSubmit={async (value, successCallback) => {
        try {
          await changeFullname(value)
          dispatchNewName(value)
          showFullnameChangedNotifiction(null, value)
          if (successCallback) successCallback()
        } catch (e) {
          catchFullnameChangeError(e)
          showFullnameChangedNotifiction({
            variant: 'error',
            title: `Oops! Something went wrong, please try again`
          })
        }
      }}
    />
  )
}

export default NameSetting

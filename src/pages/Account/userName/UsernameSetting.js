import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { store } from '../../../redux'
import { showNotification } from '../../../actions/rootActions'
import EditableInputSetting from './../EditableInputSetting'
import styles from './UsernameSettings.module.scss'

const TAKEN_MSG = 'has already been taken'

const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($value: String!) {
    changeUsername(username: $value) {
      username
    }
  }
`

const validateUsername = username => {
  if (username.length < 3) {
    return 'Username should be at least 3 characters long'
  }
  if (username && username[0] === '@') {
    return '@ is not allowed for the first character'
  }
}

const UsernameSetting = ({
  dispatchNewUsername,
  username,
  name,
  changeUsername
}) => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState()
  const normalizedUsername =
    username || (name && name.toLowerCase().replace(/ /g, '_'))

  return (
    <EditableInputSetting
      label='Username'
      defaultValue={normalizedUsername}
      validate={validateUsername}
      clearError={() => setError()}
      classes={styles}
      prefix='@'
      tooltip='Service assignation for any interactions on Sanbase'
      saving={saving}
      submitError={error}
      onSubmit={(value, successCallback) => {
        if (saving) return
        setSaving(true)
        changeUsername({ variables: { value } })
          .then(() => {
            store.dispatch(
              showNotification(`Username successfully changed to "${value}"`)
            )
            dispatchNewUsername(value)
            if (successCallback) successCallback()
          })
          .catch(error => {
            if (error.graphQLErrors[0].details.username.includes(TAKEN_MSG)) {
              setError(`Username "${value}" is already taken`)
            }
          })
          .finally(() => setSaving(false))
      }}
    />
  )
}

export default graphql(CHANGE_USERNAME_MUTATION, { name: 'changeUsername' })(
  UsernameSetting
)

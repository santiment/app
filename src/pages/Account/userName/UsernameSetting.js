import React from 'react'
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
  if (username && username.length < 3) {
    return 'Username should be at least 3 characters long'
  }
  if (username && username[0] === "@") {
    return "@ is not allowed for the first character"
  }
}

const UsernameSetting = ({ dispatchNewUsername, username, name, changeUsername }) => {
  let _username = username;
  if (!username && name) {
    _username = name.toLowerCase().replace(/ /g,"_");
  }

  return (
    <EditableInputSetting
      label='Username'
      defaultValue={_username}
      validate={validateUsername}
      classes={styles}
      prefix='@'
      onSubmit={value =>
        changeUsername({ variables: { value } })
          .then(() => {
            store.dispatch(
              showNotification(`Username successfully changed to "${value}"`)
            )
            dispatchNewUsername(value)
          })
          .catch(error => {
            // TODO: we should handle other error types
            if (error.graphQLErrors[0].details.username.includes(TAKEN_MSG)) {
              store.dispatch(
                showNotification({
                  variant: 'error',
                  title: `Username "${value}" is already taken`
                })
              )
            }
          })
      }
    />
  )
}

export default graphql(CHANGE_USERNAME_MUTATION, { name: 'changeUsername' })(
  UsernameSetting
)
